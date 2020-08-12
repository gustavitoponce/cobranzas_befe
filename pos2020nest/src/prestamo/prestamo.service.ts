import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Prestamo } from '../entidades/prestamo.entity';
import { PrestamoDto } from '../dto/prestamo-dto'; 
import { concat } from 'rxjs';

@Injectable()
export class PrestamoService {
    constructor(@InjectRepository(Prestamo) private prestamoRepo: Repository<Prestamo>) { }


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

    async getAll(incluirInactivos = 'false'): Promise<Prestamo[]> {
        let strEstatus: string;
        if ( incluirInactivos === 'false' ) {
            strEstatus = 'Prestamo.estatus = true ';
        } else {
            strEstatus = '1=1';
        }
        return await this.prestamoRepo.find(
            {   where : `${strEstatus}`,
                relations:
                [
                    'usuarioestatus',
                    'usuariomodificacion',
                ],
            });
    }
    async getById(id: number): Promise<Prestamo> {
        return await this.prestamoRepo.findOne(id, { relations:
            [
                'usuarioestatus',
                'usuariomodificacion',
            ],
        });
    }
    async create(prestamo: PrestamoDto): Promise<Prestamo> {

        console.log('paso por el metodo create gfp');
        console.log(JSON.stringify(prestamo));
        const nuevo = new Prestamo();
        nuevo.observacion = "Prueba";
                nuevo.cliente=prestamo.cliente;
        //nuevo.cliente = this.authService.usuarioActivo ;
        nuevo.importe = prestamo.importe;
        nuevo.interes = prestamo.interes;
        nuevo.tipo = prestamo.tipo;
        nuevo.tasa =prestamo.tasa;
        nuevo.fecha= new Date();
        nuevo.zona=prestamo.zona;
        console.log(nuevo.zona);
        nuevo.estatus = prestamo.estatus;
        nuevo.cuotas = prestamo.cuotas;
        console.log(nuevo.estado);
        nuevo.estado =prestamo.estado;
        nuevo.usuarioAlta=prestamo.usuarioAlta;
        //console.log(nuevo.cuota);
     //   nuevo.usuarioestatus=prestamo.usuarioAlta//this.authService.usuarioActivo;
    //nuevo.usuariomodificacion = prestamo.usuarioAlta;//this.authService.usuarioActivo;//this.authService.usuarioActivo;
        
        return await this.prestamoRepo.save(nuevo);
        
    }
  async update( id: number, prestamo: PrestamoDto ): Promise<Prestamo> {
        const prestamoActualizar = await this.prestamoRepo.findOne(id);
      //  prestamoActualizar.nombre = prestamo.nombre;
       // prestamoActualizar.rfc = prestamo.rfc;
     //   prestamoActualizar.direccion = prestamo.direccion;
     //   prestamoActualizar.logo = prestamo.logo;
     console.log('llego al puto servicio con id sssss ',id);
     console.log("viva Peron y evita");
        prestamoActualizar.observacion = "viva Peron y evita";
//prestamoActualizar.estado=prestamo.estado;
//console.log(prestamo.estado);
        return await this.prestamoRepo.save(prestamoActualizar);
    }
    async delete(id: number): Promise<DeleteResult> {
        return await this.prestamoRepo.delete(id);
    }
  /*  async updateImage(imageName: string, id: number){
        const prestamoActualizar = await this.prestamoRepo.findOne(id);
        prestamoActualizar.logo = imageName;
        return await this.prestamoRepo.save(prestamoActualizar);
    }*/
}
