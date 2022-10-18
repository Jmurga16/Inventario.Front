import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './components/inventory-form/inventory-form.component';
import { ModalHistorialComponent } from './components/modal-historial/modal-historial.component';

@NgModule({
    declarations: [
        InventoryComponent,
        InventoryListComponent,
        InventoryFormComponent,
        ModalHistorialComponent
    ],
    imports: [
        CommonModule,
        InventoryRoutingModule,

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
        MatButtonModule,
        MatFormFieldModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatTooltipModule
    ],
    exports: [RouterModule],
})
export class InventoryModule { }
