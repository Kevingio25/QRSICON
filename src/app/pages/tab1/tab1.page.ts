import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from 'src/app/servicios/data-local.service';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

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
/* 
        let i = 0;
        for (i = 0; i < tamano - 2; i++){

          this.arrayT1[i] = arrayT[i];

        }
      this.arrayT1[tamano - 1] = '0';
       this.arrayT1[tamano] = '|';
       arrayT = this.arrayT1.join('');
        console.log(arrayT);*/


       /*  *********************Es para detectar la pleca dinamicamente (no es necesatrio )
      
        let j = 0;
        let contadorPlecas =0  ;
        for (j = 0; j < tamano ; j++){
          if(arrayT[j] == "|"){
            contadorPlecas ++;
          }
        }
       console.log("el CONTADOR de plecas:" + contadorPlecas);
        var separarPleca = arrayT.split("|", contadorPlecas);
        console.log(separarPleca[contadorPlecas-1]);
        separarPleca[contadorPlecas-1] = "0";
        console.log(separarPleca);
        let i = 0;
            for (i = 0; i < tamano - 2; i++){

              this.arrayT1[i] = arrayT[i];

            }
        }*/
          // **************** Re asignamos el valor que se solicita (se encuentra al ultimo del string)
          var separarPleca = arrayT.split("|", 37);
          console.log(separarPleca[36]);
        if(separarPleca.length == 37){

          separarPleca[36] = "0";
          console.log("Ahora se cambia de 1 a: "+ separarPleca[36]);
          /*************************** Se cambia la ñ --> & en la parte del nombre  */
          var nombreMal;
          var CaracteresNombreMal;
          var concatenaNombre = "";
          nombreMal = separarPleca[4];
          CaracteresNombreMal = nombreMal.split('');

         for (let c = 0; c < CaracteresNombreMal.length; c++) {
            if(CaracteresNombreMal[c] == "ñ" || CaracteresNombreMal[c] == "Ñ"){
              CaracteresNombreMal[c] = "&";
            }
         }

         for (let c2 = 0; c2 < CaracteresNombreMal.length; c2++) { //se vuelve a jutar la cadena del nombre
            concatenaNombre = concatenaNombre + CaracteresNombreMal[c2];  
        }


         separarPleca[4] = concatenaNombre;
          // ***************** Vamos a contruir otra vez la cadena inicial 
          let j= 0;
          var cadenaQrCambiada = "";
          for (j = 0; j < separarPleca.length; j++){
            if(j == 0){
                cadenaQrCambiada = separarPleca[j];
            }else{
              cadenaQrCambiada = cadenaQrCambiada + "|" + separarPleca[j];
            }
            
          }
          arrayT = cadenaQrCambiada + "|";
          console.log("La cadena quedo: " + arrayT);
        }else{
          arrayT =  "cadena no valida_"+ arrayT ;
        }
      }else{    // si no es una clave 4050 a continuacion son los de caravanas de Velazquez
         var separarPleca = arrayT.split("|");
          var nombreMal;
            var CaracteresNombreMal;
            var concatenaNombre = "";
            nombreMal = separarPleca[4];
            CaracteresNombreMal = nombreMal.split('');
          for (let c = 0; c < CaracteresNombreMal.length; c++) {
              if(CaracteresNombreMal[c] == "ñ" || CaracteresNombreMal[c] == "Ñ"){
                CaracteresNombreMal[c] = "&";
              }
          }
          for (let c2 = 0; c2 < CaracteresNombreMal.length; c2++) { //se vuelve a jutar la cadena del nombre
              concatenaNombre = concatenaNombre + CaracteresNombreMal[c2];  
          }
          separarPleca[4] = concatenaNombre;
      }
      // tslint:disable-next-line: max-line-length
      this.dataLocal.guardarRegistro(arrayT, 0, '', '', '', '', '', '', '', '', '', '', '', '');
        // tomamos los elementos del arreglo y los guardamos en un nuevo registro
      }
     }).catch(err => {
         console.log('Error', err); // si hay error nos lo muestra
     });
  }
}
