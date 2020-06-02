import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Registro } from '../model/registro.model';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { IonList, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];
  seleccionados: Registro[] = [];

  constructor( private storage: Storage, private file: File, private emailComposer: EmailComposer, private toasCtrl: ToastController) {

    this.cargarStorage(); // cargamos en la pagina los registros que tenemos almacenados

   }
   // async funciona para esperar los datos si es que aun no los recibe
   async cargarStorage(){

    this.guardados = (await this.storage.get('registros')) || [];

   }

  // tslint:disable-next-line: max-line-length
  async guardarRegistro( unidad: string, rfc: string, curp: string, apellido1: string, apellido2: string, nombre: string, fechaIngreso: string, tipoEntrega: string, aux1: string, aux2: string, aux3: string, aux4: string, aux5: string, aux6: string  ){
    // guardamos los datos
    await this.cargarStorage();
    // carga los datos
    // tslint:disable-next-line: max-line-length
    const nuevoRegistro = new Registro( unidad, rfc, curp, apellido1, apellido2, nombre, fechaIngreso, tipoEntrega, aux1, aux2, aux3, aux4, aux5, aux6);
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
    const columnas = ' ,  , , , , , , , , , , , , , \n';
    // creamos las columnas del archivo csv
    arrTemp.push( columnas );
    // agregamos las columnas
    this.guardados.forEach( registro => { // por cada registro guardado lo agregamos a una fila del archivo creado

      // const fila = ` ${ registro.tipo }, ${ registro.formato }, ${ registro.creado }, ${ registro.texto } \n`;
      // ${ registro.texto.replace(',', ' ')} //reemplaza la coma que encuentre por un espacio
      const fila = ` ${ registro.unidad }, ${ registro.rfc }, ${ registro.curp }, ${ registro.apellido1 },  ${ registro.apellido2 }, ${ registro.nombre }, ${ registro.fechaIngreso }, ${ registro.tipoEntrega }, ${ registro.aux1 }, ${ registro.aux2 },  ${ registro.aux3 }, ${ registro.aux4 }, ${ registro.aux5 }, ${ registro.aux6 }  \n`;
      // creación de fila
      arrTemp.push( fila ); // agregamos fila
    });
    console.log( arrTemp.join(''));
    this.crearArchivo( arrTemp.join('') );
    // const tam = this.seleccionados.length;
    // this.seleccionados.splice(0, tam);
  }

  crearArchivo( texto: string ){

    this.file.checkFile( this.file.dataDirectory, 'registros.csv' ) // creamos archivo registros.csv
    .then( existe => { // si existe el archivo

      console.log('Existe el archivo?', existe);
      //  guardamos en el archivo el texto que creamos con los registros y columnas
      return this.escribirEnArchivo( texto );
    })
    .catch( err => {
      // si no existe se crea y se hace el mismo procedimiento
      return this.file.createFile( this.file.dataDirectory, 'registros.csv', false )
      .then( creado => this.escribirEnArchivo( texto ) )
      // si no se puede crear archivo mandamos mensaje
      .catch( err2 => console.log(' No se puede crear archivo ', err2) );

    });
  }

 async escribirEnArchivo( contenido: string ){
    // esperamos a recibir el contenido del archivo
    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv' , contenido );

    console.log(' Archivo Creado ');
    console.log(this.file.dataDirectory, 'registros.csv');
    // path del archivo
    const archivo = ( `${this.file.dataDirectory}registros.csv`);
    // indicamos a donde queremos enviar el correo , insertamos el archivo, asunto, cuerpo del correo
    const email = {
      to: 'kevingiovani25@gmail.com',
      attachments: [
        archivo
      ],
      subject: 'SICON Información Fomope',
      body: '<br> Adjunto los nuevos Fomopes en el archivo .csv',
      isHtml: true // activamos html en el correo
    };
    // abre correo con todos los datos
    this.emailComposer.open(email);

  }

  borraRegistro( registro ){
   const elemento = this.guardados.indexOf(registro);
   this.guardados.splice(elemento, 1);
   this.storage.set('registros', this.guardados);
   console.log( 'Borramos ', registro );
   this.presentToast('Registro eliminado');
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

}
