import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
              {
                  path: 'users',
                  loadChildren: () => import('../../../modules/users/users.module').then(m => m.UsersModule)
              },
        ]
    },

    {
        path: '**', redirectTo: 'auth/login', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule { }
