export class ProductoDto {
  constructor(
    public codigo: string,
    public nombre: string,
    public descripcion: string,
    public imagen: string,
    public costo: number,
    public precio: number,
    public unidadId: number,
    public stockminimo: number,
    public marcaId: number,
    public categoriaId: number,
    public estatus: boolean,
    public empresa: any,
    public usuarioestatus: any,
    public usuariomodificacion: any,
    public barcode: any,
  ) {}
}
