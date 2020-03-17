import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {

  private urlEndPoint:string = 'https://gameserver.centic.ovh/';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'
 });

 private token:string=null;

 constructor(private http: HttpClient) {
   let login = {"user":"ucam1",
   "password":"zvfMm37"
   }

   this.http.post<any>(this.urlEndPoint+"auth/login", login, {headers: this.httpHeaders}).subscribe(token=>{
     this.token = token.token
   })
 }


 establecerPorcentaje(porcentaje: { percent: number; }): Observable<string>{
   if(porcentaje.percent>100){
     porcentaje.percent=100;
   }
    return this.http.put<string>(this.urlEndPoint+"config?token="+this.token, porcentaje, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        Swal.fire('Error al establecer porcentaje', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
