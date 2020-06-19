

export class Registro {

    public unidad: string;
    public contador: number;
    public curp: string;
    public apellido1: string;
    public apellido2: string;
    public nombre: string;
    public fechaIngreso: string;
    public tipoEntrega: string;
    public aux1: string;
    public aux2: string;
    public aux3: string;
    public aux4: string;
    public aux5: string;
    public aux6: string;


    // tslint:disable-next-line: max-line-length
    constructor( unidad: string, contador: number, curp: string, apellido1: string, apellido2: string, nombre: string, fechaIngreso: string, tipoEntrega: string, aux1: string, aux2: string, aux3: string, aux4: string, aux5: string, aux6: string  ){


        this.unidad = unidad;
        this.contador = contador;
        this.curp = curp;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.nombre = nombre;
        this.fechaIngreso = fechaIngreso;
        this.tipoEntrega = tipoEntrega;
        this.aux1 = aux1;
        this.aux2 = aux2;
        this.aux3 = aux3;
        this.aux4 = aux4;
        this.aux5 = aux5;
        this.aux6 = aux6;

    }

    actualizarContador(newContador: number){
        this.contador = newContador;
    }
    
}
