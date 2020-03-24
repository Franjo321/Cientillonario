import { Injectable } from '@angular/core';
import { Credenciales } from '../credenciales';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Pregunta } from './pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private invitation: string;
  private validation: string;

  private urlEndPoint:string = 'https://gameserver.centic.ovh/games/';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) {
    this.invitation = localStorage.getItem('invitation');
    this.validation = localStorage.getItem('validation');
  }

  obtenerInfo(): Observable<any>{
     return this.http.get<any>(this.urlEndPoint+'info', {headers: this.httpHeaders.append('invitation', this.invitation)}).pipe(
       catchError(e => {
         Swal.fire('Error al obtener info', e, 'error');
         return throwError(e);
       })
     );
   }

}
