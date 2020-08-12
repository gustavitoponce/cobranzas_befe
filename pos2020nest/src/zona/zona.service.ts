import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Zona } from '../entidades/zona.entity';
import { ZonaDto } from '../dto/zona-dto';

@Injectable()
export class ZonaService {
  constructor(@InjectRepository(Zona) private zonaRepo: Repository<Zona>) {}

  /*
    async createEmpresa(empresa: Empresa): Promise<Empresa> {
        const nuevo = new Empresa();
        nuevo.nombre = empresa.nombre;
       // nuevo.rfc = empresa.rfc;
        nuevo.direccion = empresa.direccion;
        nuevo.logo = empresa.logo;
        //nuevo.estatus = empresa.estatus;
        //nuevo.usuarioestatus = this.authService.usuarioActivo;
        //nuevo.usuariomodificacion = this.authService.usuarioActivo;
        return await this.empresaRepository.save(nuevo);

    }


    async getEmpresas(): Promise<Empresa[]> {
        return await this.empresaRepository.find();
    }

    async getEmpresa(_id: number): Promise<Empresa[]> {
        return await this.empresaRepository.find({
            select: ["id", "nombre", "logo"],
            where: [{ "id": _id }]
        });
    }

    async updateEmpresa(empresa: Empresa) {
        this.empresaRepository.save(empresa)
    }

    async deleteEmpresa(empresa: Empresa) {
        this.empresaRepository.delete(empresa);
    }*/

  async getAll(incluirInactivos = 'false'): Promise<Zona[]> {
    let strEstatus: string;
    if (incluirInactivos === 'false') {
      strEstatus = 'Zona.estatus = true ';
    } else {
      strEstatus = '1=1';
    }
    return await this.zonaRepo.find({
      where: `${strEstatus}`,
      relations: ['usuarioestatus', 'usuariomodificacion'],
    });
  }
  async getById(id: number): Promise<Zona> {
    return await this.zonaRepo.findOne(id, {
      relations: ['usuarioestatus', 'usuariomodificacion'],
    });
  }
  async create(zona: ZonaDto): Promise<Zona> {
    const nuevo = new Zona();
    nuevo.nombre = zona.nombre;
    nuevo.rfc = zona.rfc;
    nuevo.direccion = zona.direccion;
    nuevo.logo = zona.logo;
    nuevo.estatus = zona.estatus;
    //nuevo.usuarioestatus = this.authService.usuarioActivo;
    //nuevo.usuariomodificacion = this.authService.usuarioActivo;
    return await this.zonaRepo.save(nuevo);
  }
  async update(id: number, zona: ZonaDto): Promise<Zona> {
    const zonaActualizar = await this.zonaRepo.findOne(id);
    zonaActualizar.nombre = zona.nombre;
    zonaActualizar.rfc = zona.rfc;
    zonaActualizar.direccion = zona.direccion;
    zonaActualizar.logo = zona.logo;
    zonaActualizar.estatus = zona.estatus;

    return await this.zonaRepo.save(zonaActualizar);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.zonaRepo.delete(id);
  }
  async updateImage(imageName: string, id: number) {
    const zonaActualizar = await this.zonaRepo.findOne(id);
    zonaActualizar.logo = imageName;
    return await this.zonaRepo.save(zonaActualizar);
  }
}
