import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PuntosService } from './puntos.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.css']
})
export class PuntosComponent implements OnInit {

  puntosTotales:number;
  puntosEnvio:number;
  porcentaje:number;

  constructor(private porcentajeService: PuntosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  mandarPuntos(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      let invitation = params['invitation']
      let validation = params['validation']

      if(invitation && validation){
        this.porcentajeService.obtenerInfo(invitation).subscribe( info => {
          this.puntosTotales = info.data.points,
          this.porcentaje = info.config.percent,
          this.puntosEnvio = (this.puntosTotales * this.porcentaje)/100,
          Swal.fire({
            title: '¿Enviar puntuación?',
            text: `Puntos juego: ${this.puntosTotales}, Porcentaje: ${this.porcentaje}%. Obtendrás ${this.puntosEnvio} puntos`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '!Sí, enviar!'
          }).then((result) => {
            if (result.value) {
              let send_points = {
                "validation":validation,
                "invitation":invitation,
                "percent": this.porcentaje,
                "title": "Puntos ganados",
                "resume": "Has ganado puntos con el juego",
                "message": "Como has jugado al juego del QQSC has recibido puntos por ello"
              }
              this.porcentajeService.enviarPuntos(send_points).subscribe(response => {
                Swal.fire(
                    '¡Puntuación enviada!',
                    `Has obtenido ${this.puntosEnvio} puntos`,
                    'success'
                )
              })
            }
          })
        })
      } else{
        Swal.fire(
            '¡Error al enviar puntuación!',
            `Invitation o Validation inválidos`,
            'error'
        )
      }
    })



  }
}
