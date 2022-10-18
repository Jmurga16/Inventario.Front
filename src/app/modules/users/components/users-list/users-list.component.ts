import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ListaData } from './../../models/IUsuarios'
import Swal from "sweetalert2";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  appName: string = 'Usuarios';
  usuarios: any = [];
  txtFiltro = new FormControl();

  fNombre = new FormControl();
  fRol = new FormControl();
  fEstado = new FormControl();

  lEstados: ListaData[] = [
    { valor: 2, nombre: 'Todos' },
    { valor: 1, nombre: 'Activo' },
    { valor: 0, nombre: 'Inactivo' },
  ];

  lRoles: ListaData[] = [
    { valor: 0, nombre: 'Todos' },
    { valor: 1, nombre: 'Administrador' },
    { valor: 2, nombre: 'Supervisor' },
    { valor: 3, nombre: 'Asistente' },
  ];

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'nIdUsuario',
    'sNombrePersona',
    'sNombreUsuario',
    'sNombreRol',
    'sEstado',
    'Acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {

    this.fnListarUsuarios();

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


  //#region Listar Usuarios
  async fnListarUsuarios() {
    let nOpcion: number = 1;

    await this.usersService.fnServiceGETUser(nOpcion, 0).subscribe({
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
  async fnAbrirModal(accion: number, nIdUsuario: number) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '50rem',
      disableClose: true,
      data: {
        accion: accion, //0:Nuevo , 1:Editar
        nIdUsuario: nIdUsuario
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.fnListarUsuarios();
      }
    });
  }
  //#endregion


  //#region Eliminar/Activar
  async fnCambiarEstado(nIdUsuario: number, bEstado: number) {

    let nOpcion = 3
    let sTitulo: string, sRespuesta: string;

    if (bEstado == 1) {
      sTitulo = '¿Desea activar el usuario?'
      sRespuesta = 'Se activó el usuario con éxito'
    }
    else {
      sTitulo = '¿Desea eliminar el usuario?'
      sRespuesta = 'Se eliminó el usuario con éxito'
    }

    var resp = await Swal.fire({
      title: sTitulo,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })

    if (!resp.isConfirmed) {
      return;
    }

    let pParametro = [];
    pParametro.push(nIdUsuario);
    pParametro.push(bEstado);
    console.log(pParametro)


    await this.usersService.fnServicePostUser(nOpcion, pParametro).subscribe({
      next: (value: any) => {

        if (value.cod == 1) {
          Swal.fire({
            title: sRespuesta,
            icon: 'success',
            timer: 3500
          })
        }
        this.fnListarUsuarios();

      },
      error: (e) => {
        console.error(e);
      }
    });

  }
  //#endregion Eliminar



}
