import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from 'src/app/servicios/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // función para que no se puede hacer swipe a la derecha ni izquierda en pantalla de QR
  swiperOpts = {

    allowSlidePrev: false, // izquierda
    allowSlideNext: false // derecha

  };

  constructor(private barcodeScanner: BarcodeScanner,
              private dataLocal: DataLocalService) {}
    
  ionViewWillEnter(){// cuando va a cargar la pagina

    this.scan(); // llama a la función

   }
  scan(){

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if( !barcodeData.cancelled ){ // si el scaneo no fue cancelado
      const arrayT =  barcodeData.text.split('|'); // obtiene los valores que tiene el barcode
      // separamos por los valores por | y lo guardamos en un arreglo

      // tslint:disable-next-line: max-line-length
      this.dataLocal.guardarRegistro(arrayT[0], arrayT[1], arrayT[2], arrayT[3], arrayT[4], arrayT[5], arrayT[6], arrayT[7], arrayT[8], arrayT[9], arrayT[10], arrayT[11], arrayT[12], arrayT[13]);
        // tomamos los elementos del arreglo y los guardamos en un nuevo registro
      }
     }).catch(err => {
         console.log('Error', err); // si hay error nos lo muestra
     });
  }
}
