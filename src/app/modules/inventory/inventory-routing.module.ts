import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
    {
        path: "",
        component: InventoryComponent,
        children: [
            {
                path: "list",
                component: InventoryListComponent,
                data: {
                    route: "inventory/list"
                }
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InventoryRoutingModule { }
