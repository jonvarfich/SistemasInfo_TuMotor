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
  
  addvehicle(name: string,brand: string,color:string,placa:string, year:number, serial:string){

    if(name == '' || color == '' || brand == '' || placa == '' || serial == '' || year == null){
      alert("Todos los datos deben ser llenados");
    }else if(year <= 0){
      alert("El año no puede ser negativo");
    }
    else{this.usercrud.addvehicle(name,brand,color,placa,year,serial);} 
  }
}


