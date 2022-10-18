import { MAT_DIALOG_DATA, MatDialogRef, } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { Component, OnInit, Inject } from "@angular/core";

import { UsuarioData, ListaData, GeneroData } from './../../models/IUsuarios'
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { AppDateAdapter, APP_DATE_FORMATS } from "src/app/shared/services/AppDateAdapter";

import Swal from "sweetalert2";
import { UsersService } from "../../services/users.service";
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class UsersFormComponent implements OnInit {


  nIdUsuario: number = 0;
  formUsuario: FormGroup
  sAccionModal: string = "";
  dFechaNacimiento: any;
  dFechaHoy = new Date();

  bOcultarPass = false;

  lDocumentos: ListaData[] = [
    { valor: 1, nombre: 'DNI' },
    { valor: 2, nombre: 'Carnet Ext.' },
  ];

  lRoles: ListaData[] = [
    { valor: 2, nombre: 'Supervisor' },
    { valor: 3, nombre: 'Asistente' },
  ];

  lSexo: GeneroData[] = [
    { abrev: 'M', nombre: 'Masculino' },
    { abrev: 'F', nombre: 'Femenino' },
  ];

  constructor(
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UsuarioData,
    private usersService: UsersService,
    private fB: FormBuilder,

  ) {


    this.formUsuario = this.fB.group({
      nIdUsuario: [0, Validators.required],
      sNombres: ["", Validators.required],
      sApellidos: ["", Validators.required],
      nTipoDoc: ["", Validators.required],
      sNumDoc: ["", Validators.required],
      sSexo: ["", Validators.required],
      nIdRol: ["", Validators.required],
      sDireccion: ["", Validators.required],
      nTelefono: ["", Validators.required],
      dFechaNacimiento: ["", Validators.required],
      sContrasenia: ["", Validators.required],
    });

    this.sAccionModal = this.data.accion == 0 ? "Agregar" : "Editar";


    //Cargar los Datos en caso de edicion
    if (this.data.accion == 1) {
      this.nIdUsuario = this.data.nIdUsuario;
      this.formUsuario.controls["nIdUsuario"].setValue(this.nIdUsuario)
      this.fnCargarDatos();
    }
  }

  ngOnInit(): void {

   

  }

  //#region Cargar Datos para Editar
  async fnCargarDatos() {
    let nOpcion: number = 2;

    await this.usersService.fnServiceGETUserById(nOpcion, this.nIdUsuario).subscribe({
      next: (value) => {
        this.formUsuario.controls["sNombres"].setValue(value[0].sNombres)
        this.formUsuario.controls["sApellidos"].setValue(value[0].sApellidos)
        this.formUsuario.controls["nTipoDoc"].setValue(value[0].nTipoDoc)
        this.formUsuario.controls["sSexo"].setValue(value[0].sSexo)
        this.formUsuario.controls["nIdRol"].setValue(value[0].nIdRol)
        this.formUsuario.controls["sDireccion"].setValue(value[0].sDireccion)
        this.formUsuario.controls["sNumDoc"].setValue(value[0].sNumDoc)
        this.formUsuario.controls["nTelefono"].setValue(value[0].nTelefono)
        this.formUsuario.controls["sContrasenia"].setValue(value[0].sContrasenia)
        this.formUsuario.controls["dFechaNacimiento"].setValue(value[0].dFechaNacimiento)
        this.dFechaNacimiento = value[0].dFechaNac
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
  //#endregion 


  //#region Grabar Usuario
  async fnGrabar() {

    //Validar que todos los campos tengan datos
    if (this.formUsuario.invalid) {
      return Swal.fire({
        title: `Ingrese todos los campos.`,
        icon: 'warning',
        timer: 1500
      });
    }

    //Validaciones especificas de algunos campos
    else if (!(await this.fnValidar())) {
      return
    }

    else {

      let pParametro = [];
      let pOpcion = this.data.accion == 0 ? 1 : 2; // 1-> Insertar / 2-> Editar

      pParametro.push(this.formUsuario.controls["sNombres"].value);
      pParametro.push(this.formUsuario.controls["sApellidos"].value);
      pParametro.push(this.formUsuario.controls["nTipoDoc"].value);
      pParametro.push(this.formUsuario.controls["sNumDoc"].value);
      pParametro.push(this.formUsuario.controls["sSexo"].value);
      pParametro.push(this.formUsuario.controls["nIdRol"].value);
      pParametro.push(this.formUsuario.controls["sDireccion"].value);
      pParametro.push(this.formUsuario.controls["nTelefono"].value);
      pParametro.push(this.dFechaNacimiento);
      pParametro.push(this.formUsuario.controls["sContrasenia"].value);
      pParametro.push(this.formUsuario.controls["nIdUsuario"].value);


      await this.usersService.fnServicePostUser(pOpcion, pParametro).subscribe({
        next: (value: any) => {

          if (value.cod == 1) {
            Swal.fire({
              title: value.mensaje,
              icon: 'success',
              timer: 3500
            }).then(() => {
              this.fnCerrarModal(1);
            });
          }

        },
        error: (e) => {
          console.error(e);
        }
      });

      return
    }

  }
  //#endregion


  //#region Cambiar Fecha Nacimiento
  async fnCambiarFecha(event: any) {

    let sDia, sMes, sAnio;
    //Evaluar dia
    if (event.value.getDate() < 10) {
      sDia = "0" + event.value.getDate()
    } else {
      sDia = event.value.getDate()
    }
    //Evaluar mes
    if ((event.value.getMonth() + 1) < 10) {
      sMes = "0" + (event.value.getMonth() + 1)
    }
    else {
      sMes = event.value.getMonth() + 1
    }
    //Evaluar año
    sAnio = event.value.getFullYear()

    this.dFechaNacimiento = sAnio + '-' + sMes + '-' + sDia

  }
  //#endregion Cambiar Fecha Nacimiento


  //#region Conversión de Fechas
  fnConvertirFecha(FechaParametro: any, nTipo: number) {

    let sDia, sMes, sAnio, sFecha
    var sCadena

    // DateTime a (YYYY-mm-dd)
    if (nTipo == 1) {

      if (FechaParametro != '') {

        sCadena = FechaParametro.split('-', 3);

        sDia = sCadena[2].substring(0, 2)
        sMes = sCadena[1]
        sAnio = sCadena[0]

        sFecha = sAnio + '-' + sMes + '-' + sDia

        return sFecha
      }
      else {
        return ''
      }
    }
    else {
      return
    }
  }
  //#endregion


  //#region Cerrar
  fnCerrarModal(result: any) {
    //Cerrar modal con resultado
    if (result == 1) {
      this.dialogRef.close(result);
    }
    else {
      this.dialogRef.close();
    }
  }
  //#endregion


  //#region Validaciones
  async fnValidar() {
    let bValidar: boolean = true;

    //Validar digitos del DNI
    if (!(await this.fnValidarDocumento())) {
      bValidar = false;
      return bValidar
    }

    //Validar digitos de Telefono
    if (!(await this.fnValidarTelefono())) {
      bValidar = false;
      return bValidar
    }

    return bValidar;

  }
  //#endregion


  //#region Validar DNI
  fnValidarDocumento() {
    let bValido: boolean = true;

    let nDocumento = this.formUsuario.controls["sNumDoc"].value

    if (nDocumento > 99999999 || nDocumento < 10000000) {
      bValido = false;
      Swal.fire({
        title: `El campo N° Documento debe tener 8 digitos.`,
        icon: 'warning',
        timer: 1500
      });
    }

    return bValido
  }
  //#endregion


  //#region Validar Telefono
  fnValidarTelefono() {
    let bValido: boolean = true;

    let nTelefono = this.formUsuario.controls["nTelefono"].value

    if (nTelefono > 999999999 || nTelefono < 900000000) {
      bValido = false;
      Swal.fire({
        title: `El campo de Telefono debe tener 9 digitos y empezar con 9.`,
        icon: 'warning',
        timer: 1500
      });
    }

    return bValido
  }
  //#endregion


}
