

export class Registro {

    public unidad: string;
    public rfc: string;
    public curp: string;
    public apellido1: string;
    public apellido2: string;
    public nombre: string;
    public fechaIngreso: string;
    public tipoEntrega: string;

    // tslint:disable-next-line: max-line-length
    constructor( unidad: string, rfc: string, curp: string, apellido1: string, apellido2: string, nombre: string, fechaIngreso: string, tipoEntrega: string ){


        this.unidad = unidad;
        this.rfc = rfc;
        this.curp = curp;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.nombre = nombre;
        this.fechaIngreso = fechaIngreso;
        this.tipoEntrega = tipoEntrega;

    }
}
