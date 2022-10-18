import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = environment.ApiURL

  constructor(private http: HttpClient) { }


  //#region Servicio Obtener Lista de Usuarios
  fnServiceGETUser(nOpcion: number, nIdUsuario: number): Observable<any> {
    const urlEndPoint = this.url + 'api/User';

    let queryParams = new HttpParams();
    queryParams = queryParams.append("nOpcion", nOpcion);
    queryParams = queryParams.append("nIdUsuario", nIdUsuario);

    return this.http.get<any>(urlEndPoint, { params: queryParams });
  }
  //#endregion


  //#region Obtener Usuario Por Id
  fnServiceGETUserById(nOpcion: number, nIdUsuario: number): Observable<any> {
    const urlEndPoint = this.url + 'api/User/';

    let queryParams = new HttpParams();
    queryParams = queryParams.append("nOpcion", nOpcion);

    return this.http.get<any>(urlEndPoint + nIdUsuario, { params: queryParams });
  }
  //#endregion


  //#region Servicio Post (Insertar / Editar / Eliminar)
  fnServicePostUser(nOpcion: number, pParametro: any): Observable<any> {
    const urlEndPoint = this.url + 'api/User';
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    const params = {
      nOpcion: nOpcion,
      pParametro: pParametro.join('|')
    };

    return this.http.post(urlEndPoint, JSON.stringify(params), { headers: httpHeaders });
  }
  //#endregion


  async LIS_Usuarios(nOpcion: number, pParametro: any) {
    const urlEndPoint = this.url + 'api/User';
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    const params = {
      nOpcion: nOpcion,
      pParametro: pParametro.join('|')
    };

    return this.http.post(urlEndPoint, JSON.stringify(params), { headers: httpHeaders });
  }

}
