import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersComponent } from './users.component';


const routes: Routes = [
    {
        path: "",
        component: UsersComponent,
        children: [
            {
                path: "list",
                component: UsersListComponent,
                data: {
                    route: "users/list"
                }
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }
