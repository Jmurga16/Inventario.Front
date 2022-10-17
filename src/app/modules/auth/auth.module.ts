import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { ContainerAuthComponent } from './components/container-auth/container-auth.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutModule } from 'src/app/core/components/layout/layout.module';


@NgModule({
    declarations: [
        ContainerAuthComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutModule
    ],
})
export class AuthModule { }
