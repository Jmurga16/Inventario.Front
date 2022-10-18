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


  fnServiceGETUser(nOpcion: number, nIdUsuario: number): Observable<any> {
    const urlEndPoint = this.url + 'api/User';

    let queryParams = new HttpParams();
    queryParams.append("nOpcion", nOpcion);
    queryParams.append("nIdUsuario", nIdUsuario);

    return this.http.get<any>(urlEndPoint, { params: queryParams });
  }


  async LIS_Usuarios(sOpcion: string, pParametro: any) {
    const urlEndPoint = this.url + 'UsuariosService';
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    const params = {
      sOpcion: sOpcion,
      pParametro: pParametro.join('|')
    };

    return this.http.post(urlEndPoint, JSON.stringify(params), { headers: httpHeaders }).toPromise();
  }

}
