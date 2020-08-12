import { DetalleOperacionDto } from './detalle-operacion.dto';
export declare class OperacionDto {
    readonly id: number;
    readonly personaId: number;
    readonly total: number;
    readonly tipooperacionId: number;
    readonly detalleOperacion: DetalleOperacionDto[];
}
