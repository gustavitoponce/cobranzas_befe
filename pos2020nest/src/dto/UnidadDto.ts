export class UnidadDto {
  constructor(
    public codigo: string,
    public descripcion: string,
    public estatus: boolean,
    public empresa: any,
    public usuarioestatus: any,
    public usuariomodificacion: any,
  ) {}
}
