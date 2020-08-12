import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Estado } from '../entidades/estado.entity';
import { EstadosDto } from '../dto/estadosDto';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado) private estadoRepo: Repository<Estado>,
  ) {}

  async getAll(incluirInactivos = 'false'): Promise<Estado[]> {
    let strEstatus: string;
    if (incluirInactivos === 'false') {
      strEstatus = 'Estado.estatus = true ';
    } else {
      strEstatus = '1=1';
    }
    return await this.estadoRepo.find({
      where: `${strEstatus}`,
      relations: ['usuarioestatus', 'usuariomodificacion'],
    });
  }

  async getById(id: number): Promise<Estado> {
    console.log('1111');
    return await this.estadoRepo.findOne(id, {
      relations: ['usuarioestatus', 'usuariomodificacion'],
    });
  }
  async create(estado: EstadosDto): Promise<Estado> {
    const nuevo = new Estado();
    // nuevo.nombre = zona.nombre;
    //nuevo.rfc = zona.rfc;
    // nuevo.direccion = zona.direccion;
    //  nuevo.logo = zona.logo;
    //  nuevo.estatus = zona.estatus;
    //nuevo.usuarioestatus = this.authService.usuarioActivo;
    //nuevo.usuariomodificacion = this.authService.usuarioActivo;
    return await this.estadoRepo.save(nuevo);
  }
  async update(id: number, estado: EstadosDto): Promise<Estado> {
    const estadoActualizar = await this.estadoRepo.findOne(id);
    // zonaActualizar.nombre = zona.nombre;
    //zonaActualizar.rfc = zona.rfc;
    /// zonaActualizar.direccion = zona.direccion;
    //  zonaActualizar.logo = zona.logo;
    estadoActualizar.estatus = estado.estatus;

    return await this.estadoRepo.save(estadoActualizar);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.estadoRepo.delete(id);
  }
  async updateImage(imageName: string, id: number) {
    const zonaActualizar = await this.estadoRepo.findOne(id);
    //zonaActualizar.logo = imageName;
    return await this.estadoRepo.save(zonaActualizar);
  }
}
