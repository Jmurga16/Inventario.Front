import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { InventoryService } from '../../services/inventory.service';
import { InventoryFormComponent } from '../inventory-form/inventory-form.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  appName: string = 'Inventario';
  productos: any = [];
  txtFiltro = new FormControl();

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'sNombre',
    'sDescripcion',
    'nStock',
    'Acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private inventoryService: InventoryService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.fnListarProductos();

  }

  //#region Limpiar Caja de Texto
  async fnClearFilter() {
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
    this.txtFiltro.setValue('');
  }
  //#endregion


  //#region Filtrado de Tabla
  applyFilter(event: Event) {
    //Leer el filtro
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //Si hay paginacion
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //#endregion


  //#region Listar Productos
  async fnListarProductos() {
    let nOpcion: number = 1;

    await this.inventoryService.fnServiceGETInventory(nOpcion, 0).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        console.log(e);
      }
    });

  }
  //#endregion


  //#region Abrir Modal
  async fnFormModal(accion: number, nIdProducto: number) {
    const dialogRef = this.dialog.open(InventoryFormComponent, {
      width: '50rem',
      disableClose: true,
      data: {
        accion: accion, //0:Nuevo , 1:Editar
        nIdProducto: nIdProducto
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.fnListarProductos();
      }
    });
  }
  //#endregion


  //#region Agregar / Retirar Producto
  async fnCambiarStock(nIdProducto: number, sAccion: string, nStock: number) {

    let nOpcion = 3
    let sTitulo: string = "", sRespuesta: string;

    if (sAccion == "Agregar") {
      sTitulo = `¿Desea agregar Stock del producto?, Stock Actual: ${nStock}`
      sRespuesta = 'Se agregó Stock del producto con éxito'
    }
    else if (sAccion == "Retirar") {
      sTitulo = `¿Desea retirar Stock del producto?, Stock Actual : ${nStock}`
      sRespuesta = 'Se retiró Stock del producto con éxito'
    }


    const { value: valor } = await Swal.fire({
      title: sTitulo,
      icon: 'question',

      input: 'number',
      //inputLabel: 'Stock',
      inputPlaceholder: `Cantidad a ${sAccion}`,

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',

    })

    if (!valor) {
      return;
    }

    if (sAccion == "Retirar" && parseInt(valor) > nStock) {
      Swal.fire({
        icon: "warning",
        title: "No puede retirar mayor cantidad al Stock actual"
      })
    }

    let pParametro = [];
    pParametro.push(localStorage.getItem("username"));
    pParametro.push(nIdProducto);
    pParametro.push(sAccion);
    pParametro.push(valor);


    await this.inventoryService.fnServicePostInventory(nOpcion, pParametro).subscribe({
      next: (value: any) => {

        if (value.cod == 1) {
          Swal.fire({
            title: sRespuesta,
            icon: 'success',
            timer: 3500
          })
        }
        this.fnListarProductos();

      },
      error: (e) => {
        console.error(e);
      }
    });

  }
  //#endregion Eliminar


}
