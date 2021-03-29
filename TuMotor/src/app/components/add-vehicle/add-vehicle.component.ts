import { Component, OnInit } from '@angular/core';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  constructor(
    private usercrud: UserCrudService,
  ) { }

  ngOnInit(): void {
  }
  
  addvehicle(name: string,brand: string,color:string,placa:string, year:number, serial:string, foto:string){

    if(name == '' || color == '' || brand == '' || placa == '' || serial == '' || year == null){
      alert("all fields must be filled");
    }
    else{this.usercrud.addvehicle(name,brand,color,placa,year,serial,foto);} 
  }
}


