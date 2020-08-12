export class DetallePrestamoDto {
  public readonly id: number;
  public readonly prestamo: any;
  public readonly nrocuota: number;
  public readonly capital: number;
  public readonly interes: number;
  public readonly vencimiento: Date;
  public readonly importe_pag: number;
  public readonly fecha_pago: Date;
}
