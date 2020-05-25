import { Component } from '@angular/core';
import { DataLocalService } from '../../servicios/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DataLocalService) {}

  enviarCorreo(){

    // console.log('Enviando Correo');
    this.dataLocal.enviarCorreo(); //enviamos correo 
    
  }
  
  abrirRegistro( registro ){ // aqui irá la funcion enviar correo para que solo se manden los seleccionados

    console.log('Registro', registro);

  }
}
