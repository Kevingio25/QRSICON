

export class Lote {

    public numeroLote: string;
    public contador: number;

    // tslint:disable-next-line: max-line-length
    constructor( numeroLote: string, contador: number){
        this.numeroLote = numeroLote;
        this.contador = contador;
    }
 
    get getLote(): string {
        return this.numeroLote;
    }
    set setLote(value: string) {
        this.numeroLote = value;
    }

    get getContador(): number {
        return this.contador;
    }
    set setContador(value: number) {
        this.contador = value;
    }

     aumentarContador(){
        this.contador ++;
    }

    restarContador(){
        this.contador --;
    }

    reiniciarContador(){
        this.contador = 0;
    }
}
