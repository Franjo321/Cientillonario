import { Component, OnInit } from '@angular/core';
import { PuntosService } from './puntos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


porcentaje = {"percent":null};

constructor(private porcentajeService: PuntosService) { }

ngOnInit(): void {
}

establecerPorcentaje(percent): void{
  this.porcentajeService.establecerPorcentaje(percent).subscribe( response =>{
    Swal.fire(
        '¡Porcentaje establecido!',
        `Se ha establecido ${this.porcentaje.percent} como porcentaje`,
        'success'
      )
  })

}

}
