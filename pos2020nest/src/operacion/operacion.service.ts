import { Injectable } from '@nestjs/common';
import { Operacion } from '../entidades/operacion.entity';
import { AuthService } from '../auth/auth.service';
import { Repository, getConnection, Equal, AdvancedConsoleLogger } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OperacionDto } from '../dto/operacion.dto';
import { DetalleOperacion } from '../entidades/detalle-operacion.entity';
import { Inventario } from '../entidades/inventario.entity';
import { ProductoService } from '../producto/producto.service';
import { PersonaService } from '../persona/persona.service';
import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
//import { Prestamo } from 'src/entidades/prestamo.entity';
import { Prestamo } from '../entidades/prestamo.entity';
import { Usuario } from '../entidades/usuario.entity';


@Injectable()
export class OperacionService {
  constructor(
    @InjectRepository(Operacion)
    private readonly operacionRepo: Repository<Operacion>,
    private authService: AuthService,
    private productoService: ProductoService,
    private personaService: PersonaService,
    private tipoOperacionService: TipoOperacionService,
  ) {}

  async getAll(): Promise<Operacion[]> {
    return await this.operacionRepo.find({
      where: 'Operacion.empresa = 1',
      // relations: ['detalleOperacion'],
      order: {
        id: 'ASC',
      },
    });
  }

  async create(operacionDto: OperacionDto): Promise<Operacion> {
    return new Promise(async (resolve, reject) => {
      const queryRunner = getConnection().createQueryRunner();
      await queryRunner.startTransaction();

      try {
        let operacion: Operacion = new Operacion();
        const detalle: DetalleOperacion[] = [];
        const mensajesStockAgotado: string[] = [];
        operacion.empresa = this.authService.empresaActiva;
        operacion.usuariomodificacion = this.authService.usuarioActivo;
        console.log(operacion.usuariomodificacion.id);
        operacion.persona = await this.personaService.getById(
          operacionDto.personaId,
        );
        
        operacion.total = operacionDto.total;
        operacion.tipooperacion = await this.tipoOperacionService.getById(
          operacionDto.tipooperacionId,
        );
        console.log('usuario');
        console.log(this.authService.usuarioActivo);
const usuariomod = new Usuario();
usuariomod.id=1;
        operacion.usuariomodificacion =usuariomod; //this.authService.usuarioActivo;
        console.log('guardar detalle');
        // GUARDAR ENCABEZADO
        console.log(operacion);
        // puse esto para probar si funciona el query manager y anda ok
       
        const operacionGuardarda1: Operacion = await queryRunner.query("SELECT * FROM operacion");
        const operacionGuardarda: Operacion = await queryRunner.manager.save( operacion  );
        await queryRunner.commitTransaction();
          await queryRunner.release();
          resolve(operacionGuardarda);
          console.log(operacionGuardarda1);
          
        /*for (const detalleOperacion of operacionDto.detalleOperacion) {
          const det = new DetalleOperacion();
          const producto = await this.productoService.getById(
            detalleOperacion.productoId,
          );
          det.empresa.id = 1;//this.authService.empresaActiva;
          //det.operacion = operacionGuardarda;
          det.producto.id = 12;//producto;
          det.cantidad = detalleOperacion.cantidad;
          det.total = detalleOperacion.total;
          det.usuariomodificacion = this.authService.usuarioActivo;
          detalle.push(det);
//Equal(this.authService.empresaActiva.id)
//Equal(detalleOperacion.productoId)
          const inventarioAct = await queryRunner.manager
            .getRepository(Inventario)
            .findOne({
              where: {
                
                empresa: 1,
                producto: '0012',
              },
            });

          if (inventarioAct) {
            inventarioAct.stock +=
              detalleOperacion.cantidad * operacion.tipooperacion.naturaleza;

            if (inventarioAct.stock < 0) {
              mensajesStockAgotado.push(
                `${inventarioAct.producto.codigo} - ${inventarioAct.producto.nombre}`,
              );
            }

            if (mensajesStockAgotado.length === 0) {
              await queryRunner.manager.save(inventarioAct);
            }
          } else {
            throw new Error(
              `No se encontro registro de inventario para el producto: ${producto.nombre}`,
            );
          }
        }

        if (mensajesStockAgotado.length === 0) {
          // GUARDAR DETALLE
          
          const detalleOperacionGuardado: DetalleOperacion[] = await queryRunner.manager.save(
            detalle,
          );

          await queryRunner.commitTransaction();
          await queryRunner.release();
          resolve(operacionGuardarda);
        } else {
          let mensaje: string = 'Los productos: <br>';

          mensajesStockAgotado.forEach(elemento => {
            mensaje += elemento + '<br>';
          });
          mensaje += 'no tienen suficienten stock';

          throw new Error(mensaje);
        }*/
      } catch (error) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        
        console.log('error ' ,error);
        reject(error);
      }
    });
  }
}
