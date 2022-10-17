import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutComponent } from './layout.component';



@NgModule({
    declarations: [
        LayoutComponent,
        NavMenuComponent,
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatSidenavModule,
        FormsModule, 
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatButtonModule
    ],
    exports: [RouterModule],
})
export class LayoutModule { }
