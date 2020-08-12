import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Prestamo } from '../entidades/prestamo.entity';
import { DetallePrestamo } from '../entidades/detalle-prestamo.entity';
import { DetallePrestamoDto } from '../dto/detalle-prestamo.dto';
import { PrestamoDto } from '../dto/prestamo-dto';

@Injectable()
export class DetallePrestamoService {
  constructor(
 
    @InjectRepository(DetallePrestamo)  private detalleprestamoRepo: Repository<DetallePrestamo>,
  ) {}

  async getAll(incluirInactivos = 'false'): Promise<DetallePrestamo[]> {
    let strEstatus: string;
    
    if (incluirInactivos === 'false') {
      strEstatus = 'Prestamo.estatus = true ';
    } else {
      strEstatus = '1=1';
    }
    return await this.detalleprestamoRepo.find({
      where: `${strEstatus}`,
      relations: ['usuarioestatus', 'usuariomodificacion'],
    });
  }
  async getById(id: number): Promise<DetallePrestamo> {
    return await this.detalleprestamoRepo.findOne(id, {
      relations: ['usuarioestatus', 'usuariomodificacion'],
    });
  }
  async create(detalleprestamo: DetallePrestamoDto): Promise<DetallePrestamo> {
    console.log('paso por el metodo create detalleprestamo.service.ts ');
    console.log(JSON.stringify(detalleprestamo));
    const nuevo = new DetallePrestamo();

    /*nuevo.cliente = prestamo.cliente;
    nuevo.importe = prestamo.importe;
    nuevo.interes = prestamo.interes;
    nuevo.tipo = prestamo.tipo;
    nuevo.fecha = new Date();
    nuevo.zona = prestamo.zona;
    nuevo.estatus = prestamo.estatus;
    nuevo.cuotas = prestamo.cuotas;*/
    
    nuevo.capital=detalleprestamo.capital;
    //nuevo.nrocuota = 100;
    console.log('cantidad de cuotas');
    console.log(nuevo.nrocuota);
    //nuevo.usuarioestatus = this.authService.usuarioActivo;
    //nuevo.usuariomodificacion = this.authService.usuarioActivo;

    return await this.detalleprestamoRepo.save(nuevo);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.detalleprestamoRepo.delete(id);
  }
  /*  async updateImage(imageName: string, id: number){
        const prestamoActualizar = await this.prestamoRepo.findOne(id);
        prestamoActualizar.logo = imageName;
        return await this.prestamoRepo.save(prestamoActualizar);
    }*/
}
