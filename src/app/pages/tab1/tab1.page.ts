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
  arrayT1: Array<string> = [];


  constructor(private barcodeScanner: BarcodeScanner,
              private dataLocal: DataLocalService) {}
    
  ionViewWillEnter(){// cuando va a cargar la pagina

    this.scan(); // llama a la función

   }
  scan(){

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if( !barcodeData.cancelled ){ // si el scaneo no fue cancelado
      //const arrayT =  barcodeData.text.split('|');
       // obtiene los valores que tiene el barcode
      let arrayT =  barcodeData.text;
      // separamos por los valores por | y lo guardamos en un arreglo
      if ( arrayT.startsWith( '4505' , 0 ) === true){
        console.log('Listo');
        const tamano = arrayT.length;
        //  const con = arrayT.lastIndexOf("1");
        console.log(tamano);

        let i = 0;
        for (i = 0; i < tamano - 2; i++){

        this.arrayT1[i] = arrayT[i];

       }
       this.arrayT1[tamano - 1] = '0';
       this.arrayT1[tamano] = '|';
       arrayT = this.arrayT1.join('');
        console.log(arrayT);

        }
      // tslint:disable-next-line: max-line-length
      this.dataLocal.guardarRegistro(arrayT, '', '', '', '', '', '', '', '', '', '', '', '', '');
        // tomamos los elementos del arreglo y los guardamos en un nuevo registro
      }
     }).catch(err => {
         console.log('Error', err); // si hay error nos lo muestra
     });
  }
}
