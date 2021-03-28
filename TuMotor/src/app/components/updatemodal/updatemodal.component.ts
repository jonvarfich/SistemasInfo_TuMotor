import { Component, OnInit } from '@angular/core';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-updatemodal',
  templateUrl: './updatemodal.component.html',
  styleUrls: ['./updatemodal.component.scss']
})
export class UpdatemodalComponent implements OnInit {

  constructor(
    private usercrud: UserCrudService,
  ) { }

  ngOnInit(): void {
  }

  updateUser(displayName: string){

    if(displayName!=''){
      this.usercrud.userUpdate(displayName);
    }
    else{
      alert('Must fill all fields');
    }    

  }

}
