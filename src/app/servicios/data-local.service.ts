import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Registro } from '../model/registro.model';
import { Lote } from '../model/lote.model';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { IonList, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];
  seleccionados: Registro[] = [];
  numLot: Lote;
  
  constructor( private storage: Storage, private file: File, private emailComposer: EmailComposer, private toasCtrl: ToastController) {

    this.cargarStorage(); // cargamos en la pagina los registros que tenemos almacenados

   }
   // async funciona para esperar los datos si es que aun no los recibe
   async cargarStorage(){

    this.guardados = (await this.storage.get('registros')) || [];

   }

  // tslint:disable-next-line: max-line-length
  async guardarRegistro( unidad: string, contador: number, curp: string, apellido1: string, apellido2: string, nombre: string, fechaIngreso: string, tipoEntrega: string, aux1: string, aux2: string, aux3: string, aux4: string, aux5: string, aux6: string  ){
    // guardamos los datos
    
    await this.cargarStorage();
    this.numLot.aumentarContador();
    contador = this.numLot.getContador;
    console.log("El contador:", this.numLot.getContador);
    var separarPleca = unidad.split("|");
    separarPleca[2] = this.numLot.getLote;
    let j= 0;
          var cadenaQrCambiada = "";
          for (j = 0; j < separarPleca.length; j++){
            if(j == 0){
                cadenaQrCambiada = separarPleca[j];
            }else{
              cadenaQrCambiada = cadenaQrCambiada + "|" + separarPleca[j];
            }
          }
          unidad = cadenaQrCambiada;
          console.log("La cadena quedo: " + unidad);
    // carga los datos
    // tslint:disable-next-line: max-line-length
    const nuevoRegistro = new Registro( unidad,contador, curp, apellido1, apellido2, nombre, fechaIngreso, tipoEntrega, aux1, aux2, aux3, aux4, aux5, aux6);
    // se crea un nuevo registro
    this.guardados.unshift( nuevoRegistro ); // lo agregamos al final del storage
    console.log(this.guardados);
    this.storage.set('registros', this.guardados);

  }

  async presentToast(message: string) {
    const toast = await this.toasCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  enviarCorreo(){

    const arrTemp = []; // arreglo que sirve para guardar toda la información que queremos poner en el csv 
    // const columnas = ' ,  , , , , , , , , , , , , , \n';
    // creamos las columnas del archivo csv
    // arrTemp.push( columnas );
    // agregamos las columnas
    this.guardados.forEach( registro => { // por cada registro guardado lo agregamos a una fila del archivo creado

      // const fila = ` ${ registro.tipo }, ${ registro.formato }, ${ registro.creado }, ${ registro.texto } \n`;
      // ${ registro.texto.replace(',', ' ')} //reemplaza la coma que encuentre por un espacio
      // tslint:disable-next-line: max-line-length
      // const fila = ` ${ registro.unidad }, ${ registro.rfc }, ${ registro.curp }, ${ registro.apellido1 },  ${ registro.apellido2 }, ${ registro.nombre }, ${ registro.fechaIngreso }, ${ registro.tipoEntrega }, ${ registro.aux1 }, ${ registro.aux2 },  ${ registro.aux3 }, ${ registro.aux4 }, ${ registro.aux5 }, ${ registro.aux6 }  \n`;
      const fila = ` ${ registro.unidad } \r\n`;
      // creación de fila
      arrTemp.push( fila ); // agregamos fila
    });
    console.log( arrTemp.join(''));
    this.crearArchivo( arrTemp.join('') );
    // const tam = this.seleccionados.length;
    // this.seleccionados.splice(0, tam);
  }

  crearArchivo( texto: string ){

    this.file.checkFile( this.file.dataDirectory, 'registros.txt' ) // creamos archivo registros.csv
    .then( existe => { // si existe el archivo

      console.log('Existe el archivo?', existe);
      //  guardamos en el archivo el texto que creamos con los registros y columnas
      return this.escribirEnArchivo( texto );
    })
    .catch( err => {
      // si no existe se crea y se hace el mismo procedimiento
      return this.file.createFile( this.file.dataDirectory, 'registros.txt', false )
      .then( creado => this.escribirEnArchivo( texto ) )
      // si no se puede crear archivo mandamos mensaje
      .catch( err2 => console.log(' No se puede crear archivo ', err2) );

    });
  }

 async escribirEnArchivo( contenido: string ){
    // esperamos a recibir el contenido del archivo
    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.txt' , contenido );

    console.log(' Archivo Creado ');
    console.log(this.file.dataDirectory, 'registros.txt');
    // path del archivo
    const archivo = ( `${this.file.dataDirectory}registros.txt`);
    // indicamos a donde queremos enviar el correo , insertamos el archivo, asunto, cuerpo del correo
    const email = {
      to: 'disps.secretariasalud.cdmx@gmail.com',
      attachments: [
        archivo
      ],
      subject: 'SICON Información Fomope',
      body: '<br> Adjunto los nuevos Fomopes en el archivo .txt',
      isHtml: true // activamos html en el correo
    };
    // abre correo con todos los datos
    this.emailComposer.open(email);

  }

  borraRegistro( registro ){
   const elemento = this.guardados.indexOf(registro);
   this.numLot.restarContador();
   var pasarCont = this.numLot.getContador;
   this.guardados.splice(elemento, 1);
   this.storage.set('registros', this.guardados);
   //this.storage.set('loteos', this.guardados);
   console.log( 'Borramos ', registro );
   this.presentToast('Registro eliminado');
   console.log("el tamaño del arreglo guardar es: ",this.guardados.length);
   for (let i = 0; i < this.guardados.length-1; i++) {
      this.guardados[i].actualizarContador(pasarCont);
   }
   
  }

  // registroSeleccionado( registro ){

  //   this.seleccionados.unshift( registro );
  //   this.presentToast('Registro seleccionado');
  // }


  borraRegistros(){

    const tam = this.guardados.length;
    this.guardados.splice(0, tam);
    this.storage.set('registros', this.guardados);
    this.presentToast('Registros eliminados');
  }

  async agregarL(recibeLote: string){
    //const elemento = this.numLot.indexOf(recibeLote);
   // this.guardados.splice(elemento, 1);
    this.numLot = new Lote(recibeLote,0);
    this.numLot.reiniciarContador();
    // se crea un nuevo registro
   console.log( 'el lote ', this.numLot.getLote );
   // this.presentToast('Registro eliminado');
  }
}
