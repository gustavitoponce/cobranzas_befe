export interface IServiceBase {
    consultarTodo(incluirInactivos: boolean): any;
    consultarImagen(id:number): any;
    consultarPorId(id: number): any;
    registrar(nuevo: any): any;
    actualizar(id: number, actualizar: any): any;
    borrar(id: number): any;
}
