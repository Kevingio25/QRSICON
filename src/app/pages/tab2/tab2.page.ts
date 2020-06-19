import { Component } from '@angular/core';
import { AlertController, ToastController  } from '@ionic/angular';
import { DataLocalService } from '../../servicios/data-local.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DataLocalService, private alertCtrl: AlertController, private toasCtrl: ToastController) {}

  enviarCorreo(){

    // console.log('Enviando Correo');
    this.dataLocal.enviarCorreo(); // enviamos correo 
    
  }
  async presentToast(message: string) {
    const toast = await this.toasCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  borrar( registro){
    this.dataLocal.borraRegistro( registro ); // llamamos la función para borrar un registro con el parametro seleccionado
  }

  agregarL( numLot ){
    this.dataLocal.agregarL(numLot);
  }

  borraRegistros(){
    this.dataLocal.borraRegistros();
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      subHeader: 'Borrar registros',
      message: '¿Está seguro de querer eliminar todos los registros?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Cancel');
          }
        }, {
          cssClass: 'danger',
          text: 'Borrar',
          role: 'aceptar',
          handler: (blah) => {
            this.borraRegistros();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertLoteo() {
    const alert = await this.alertCtrl.create({
    header: 'Lote',
    subHeader: 'Agregar Lote',
    message: 'Recuerda que son 7 caracteres',
  inputs: [
    {
      name: 'userLote',
      placeholder: 'LOTE',
      min: '7',
      max: '7'
    }
  ],
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: data => {
        console.log('Cancel clicked');
      }
    },
    {
      text: 'Agreagar',
      handler: data => {
        //data.username
          this.agregarL(data.userLote);
      }
    }
  ]
});
alert.present();
}

}