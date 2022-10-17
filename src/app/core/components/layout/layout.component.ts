import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {


    constructor(
        private router: Router,
        public ngZone: NgZone,

    ) {

   

    }

    ngOnInit(): void {
    }

}
