import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Vehicle } from 'src/app/models/vehicle';
import { NgAuthService } from 'src/app/services/auth.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-updatecar',
  templateUrl: './updatecar.component.html',
  styleUrls: ['./updatecar.component.scss'],
})
export class UpdatecarComponent implements OnInit {

  @Input() carid: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  constructor(private ngAuthService: NgAuthService, private usercrud: UserCrudService, private storage: AngularFireStorage) {}
 
  ngOnInit(): void {}  

  updateVehicle(name: string, placa:string, color: string) {
    if (name != '' && placa != '' && color != '') {
      this.ngAuthService.afs.collection<User>('users').doc<User>(this.ngAuthService.userdata.uid).collection<Vehicle>('vehicles')
      .doc<Vehicle>(this.carid).update(
        {
          'name': name,
          'color': color,
          'placa': placa,
        }
      );

    } else {
      alert('Must fill name field');
    }
  }

  //Este método no está verificando que sólo se seleccione un archivo .jpg o .png
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(

        finalize( () => this.photoupdate( fileRef.getDownloadURL() ) )
     )
    .subscribe( )

  }

  photoupdate(str:Observable<string>){
    this.downloadURL = str;
    console.log(this.downloadURL);
    this.downloadURL.subscribe(
      val => this.ngAuthService.afs.collection<User>('users').doc<User>(this.ngAuthService.userdata.uid).collection<Vehicle>('vehicles')
      .doc<Vehicle>(this.carid).update(
        {
          'foto':val,
        }
      )
    )
    

  }

}
