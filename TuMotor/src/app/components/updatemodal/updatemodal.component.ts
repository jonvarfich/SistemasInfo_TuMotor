import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-updatemodal',
  templateUrl: './updatemodal.component.html',
  styleUrls: ['./updatemodal.component.scss'],
})
export class UpdatemodalComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  constructor(private usercrud: UserCrudService, private storage: AngularFireStorage) {}
 
  ngOnInit(): void {}  

  updateUser(displayName: string) {
    if (displayName != '') {
      console.log('updated!!');
      this.usercrud.userUpdate(displayName);
    } else {
      alert('Must fill all fields');
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
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
}
