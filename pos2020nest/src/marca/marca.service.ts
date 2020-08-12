import { Injectable } from '@nestjs/common';
import { Marca } from '../entidades/marca.entity';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcaDto } from '../dto/MarcaDto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MarcaService {
  private relaciones: string[] = [
    'empresa',
    'usuarioestatus',
    'usuariomodificacion',
  ];
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepo: Repository<Marca>,
    private authService: AuthService,
  ) {}

  async getAll(incluirInactivos = 'false'): Promise<Marca[]> {
    let strEstatus: string;

    if (incluirInactivos === 'false') {
      strEstatus = ' AND Marca.estatus = true ';
    } else {
      strEstatus = '';
    }

    return await this.marcaRepo.find({
      //where: `Marca.empresa = ${this.authService.empresaActiva.id} ${strEstatus}`,
      relations: this.relaciones,
      order: {
        id: 'ASC',
      },
    });
  }
  async getById(id: number): Promise<Marca> {
    return await this.marcaRepo.findOne(id, {
      //where: `Marca.empresa = ${this.authService.empresaActiva.id}`,
      relations: this.relaciones,
    });
  }
  async create(marca: MarcaDto): Promise<Marca> {
    const nuevamarca: Marca = new Marca();

    nuevamarca.empresa = marca.empresa;
    nuevamarca.nombre = marca.nombre;
    nuevamarca.descripcion = marca.descripcion;
    nuevamarca.estatus = marca.estatus;
    nuevamarca.usuarioestatus = marca.usuarioestatus;
    nuevamarca.usuariomodificacion = marca.usuariomodificacion;
    return await this.marcaRepo.save(nuevamarca);
  }
  async update(id: number, marca: MarcaDto): Promise<Marca> {
    const marcaActualizar: Marca = await this.marcaRepo.findOne(id);
    marcaActualizar.nombre = marca.nombre;
    marcaActualizar.descripcion = marca.descripcion;

    if (marcaActualizar.estatus !== marca.estatus) {
      marcaActualizar.estatus = marca.estatus;
      marcaActualizar.usuarioestatus = marca.usuarioestatus;
    }

    marcaActualizar.usuariomodificacion = marca.usuariomodificacion;
    return await this.marcaRepo.save(marcaActualizar);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.marcaRepo.delete(id);
  }

  async search(term: string, incluirInactivos: string) {
    let strEstatus: string;

    if (incluirInactivos === 'false') {
      strEstatus = 'AND Marca.estatus = true ';
    } else {
      strEstatus = 'AND 1=1';
    }
    //Marca.empresa = ${this.authService.empresaActiva.id}  AND
    return await this.marcaRepo.find({
      where: ` (LOWER(Marca.nombre) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Marca.descripcion) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
      relations: this.relaciones,
    });
  }
}
