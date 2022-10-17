import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    localStorageName = "username"
    url: string = environment.ApiURL

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {

    }

    Login(nOpcion: number, pParametro: any): Observable<any> {
        const urlEndPoint = this.url + 'api/Login';
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

        const params = {
            nOpcion: nOpcion,
            pParametro: pParametro.join('|')
        };

        return this.httpClient.post(urlEndPoint, JSON.stringify(params), { headers: httpHeaders });
    }


    get currentUserValue(): boolean {
        let bValue: boolean = false;

        bValue = localStorage.getItem("username") != null ? true : false

        return bValue

    }

    Logout() {

        localStorage.removeItem(this.localStorageName);

        this.router.navigate(['/auth/login'], {
            queryParams: {},
        });
    }

}
