import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Empresa } from '../entidades/empresa.entity';
import { EmpresaDto } from '../dto/empresa-dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa) private empresaRepo: Repository<Empresa>,
  ) {}

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

  async getAll(incluirInactivos = 'false'): Promise<Empresa[]> {
    let strEstatus: string;
    if (incluirInactivos === 'false') {
      strEstatus = 'Empresa.estatus = true ';
    } else {
      strEstatus = '1=1';
    }
    return await this.empresaRepo.find({
      where: `${strEstatus}`,
      relations: ['usuarioestatus', 'usuariomodificacion'],
    });
  }
  async getById(id: number): Promise<Empresa> {
    return await this.empresaRepo.findOne(id, {
      relations: ['usuarioestatus', 'usuariomodificacion'],
    });
  }
  async create(empresa: EmpresaDto): Promise<Empresa> {
    const nuevo = new Empresa();
    nuevo.nombre = empresa.nombre;
    nuevo.rfc = empresa.rfc;
    nuevo.direccion = empresa.direccion;
    nuevo.logo = empresa.logo;
    nuevo.estatus = empresa.estatus;
    //nuevo.usuarioestatus = this.authService.usuarioActivo;
    //nuevo.usuariomodificacion = this.authService.usuarioActivo;
    return await this.empresaRepo.save(nuevo);
  }
  async update(id: number, empresa: EmpresaDto): Promise<Empresa> {
    const empresaActualizar = await this.empresaRepo.findOne(id);
    empresaActualizar.nombre = empresa.nombre;
    empresaActualizar.rfc = empresa.rfc;
    empresaActualizar.direccion = empresa.direccion;
    empresaActualizar.logo = empresa.logo;
    empresaActualizar.estatus = empresa.estatus;
    return await this.empresaRepo.save(empresaActualizar);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.empresaRepo.delete(id);
  }
  async updateImage(imageName: string, id: number) {
    const empresaActualizar = await this.empresaRepo.findOne(id);
    empresaActualizar.logo = imageName;
    return await this.empresaRepo.save(empresaActualizar);
  }
}
