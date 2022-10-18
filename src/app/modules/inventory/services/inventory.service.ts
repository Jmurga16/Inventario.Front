import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  url: string = environment.ApiURL

  constructor(private http: HttpClient) { }

    //#region Servicio Obtener Lista de Uroductos
    fnServiceGETInventory(nOpcion: number, nIdUroducto: number): Observable<any> {
      const urlEndPoint = this.url + 'api/Inventory';
  
      let queryParams = new HttpParams();
      queryParams = queryParams.append("nOpcion", nOpcion);
      queryParams = queryParams.append("nIdProducto", nIdUroducto);
  
      return this.http.get<any>(urlEndPoint, { params: queryParams });
    }
    //#endregion
  
  
    //#region Obtener Uroducto Por Id
    fnServiceGETInventoryById(nOpcion: number, nIdUroducto: number): Observable<any> {
      const urlEndPoint = this.url + 'api/Inventory/';
  
      let queryParams = new HttpParams();
      queryParams = queryParams.append("nOpcion", nOpcion);
  
      return this.http.get<any>(urlEndPoint + nIdUroducto, { params: queryParams });
    }
    //#endregion
  
  
    //#region Servicio Post (Insertar / Editar / Eliminar)
    fnServicePostInventory(nOpcion: number, pParametro: any): Observable<any> {
      const urlEndPoint = this.url + 'api/Inventory';
      const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      const params = {
        nOpcion: nOpcion,
        pParametro: pParametro.join('|')
      };
  
      return this.http.post(urlEndPoint, JSON.stringify(params), { headers: httpHeaders });
    }
    //#endregion
}
