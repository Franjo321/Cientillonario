import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {

  private urlEndPoint:string = 'https://gameserver.centic.ovh/games/';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

 constructor(private http: HttpClient) {
 }

 obtenerInfo(invitation: string): Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'info', {headers: this.httpHeaders.append('invitation', invitation)}).pipe(
      catchError(e => {
        Swal.fire('Error al obtener puntuación a enviar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  enviarPuntos(puntos: { "validation": any; "invitation": any; "percent": number; "title": string; "resume": string; "message": string; }): Observable<any>{
    console.log(puntos);
    return this.http.post<any>(this.urlEndPoint+'send_points', puntos, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire('Error al enviar la puntuación', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

}
