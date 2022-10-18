import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {

  NombreUsuario: string | null = "";
  nIdProducto: number = 0;

  formGroup: FormGroup;
  sAccionModal: string = "";

  constructor(
    public dialogRef: MatDialogRef<InventoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder,

  ) {

    this.formGroup = this.formBuilder.group({
      nIdProducto: [0],
      sNombre: ["", Validators.required],
      sDescripcion: ["", Validators.required],
      nStock: ["", Validators.required],
      bEstado: [true],

    });

    this.sAccionModal = this.data.accion == 0 ? "Agregar" : "Editar";


    //Cargar los Datos en caso de edicion
    if (this.data.accion == 1) {
      this.nIdProducto = this.data.nIdProducto;
      this.formGroup.controls["nIdProducto"].setValue(this.nIdProducto)
      this.fnCargarDatos();
    }

  }

  ngOnInit(): void {

    this.NombreUsuario = localStorage.getItem("username")
  }

  //#region Cargar Datos para Editar
  async fnCargarDatos() {
    let nOpcion: number = 2;

    await this.inventoryService.fnServiceGETInventoryById(nOpcion, this.nIdProducto).subscribe({
      next: (value: any) => {

        this.formGroup.reset({
          'nIdProducto': value[0].nIdProducto,
          'sNombre': value[0].sNombre,
          'sDescripcion': value[0].sDescripcion,
          'nStock': value[0].nStock,
          'bEstado': value[0].bEstado
        })


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
    if (this.formGroup.invalid) {
      return Swal.fire({
        title: `Ingrese todos los campos.`,
        icon: 'warning',
        timer: 1500
      });
    }

    else {

      let pParametro = [];
      let pOpcion = this.data.accion == 0 ? 1 : 2; // 1-> Insertar / 2-> Editar

      pParametro.push(this.NombreUsuario);

      pParametro.push(this.formGroup.controls["sNombre"].value);
      pParametro.push(this.formGroup.controls["sDescripcion"].value);
      pParametro.push(this.formGroup.controls["nStock"].value);
      pParametro.push(this.formGroup.controls["nIdProducto"].value);

      await this.inventoryService.fnServicePostInventory(pOpcion, pParametro).subscribe({
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



}
