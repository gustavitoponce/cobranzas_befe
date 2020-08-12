import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, AdvancedConsoleLogger, getConnection, QueryBuilder } from 'typeorm';
import { Prestamo } from '../entidades/prestamo.entity';
import { DetallePrestamo } from '../entidades/detalle-prestamo.entity';

import { PrestamoDto } from '../dto/prestamo-dto';
import { S_IFSOCK } from 'constants';
import { Estado } from 'src/entidades/estado.entity';

//private detalleprestamoRepo: Repository<DetallePrestamo>,
@Injectable()
export class PrestamoService {
  constructor(
    
    @InjectRepository(Prestamo) private prestamoRepo: Repository<Prestamo>,
    @InjectRepository(DetallePrestamo) private detalleprestamoRepo: Repository<DetallePrestamo>
 
  ) { }

  async getAll(incluirInactivos = 'false'): Promise<Prestamo[]> {
    const queryRunner = getConnection().createQueryRunner();
    let strEstatus: string;
    if (incluirInactivos === 'false') {
      strEstatus = 'Prestamo.estatus = true ';
    } else {
      strEstatus = '1=1';
    }
  //return  await  queryRunner.query('select persona.nombre,prestamo.*   from prestamo left join   persona on   prestamo.cliente=persona.id');

  

  
    return await this.prestamoRepo.find({
      where: `${strEstatus}`,
   
    });
  }
  

  async getDetail(id: number ): Promise<DetallePrestamo[]> {
    console.log('getDetail')
    const queryRunner = getConnection().createQueryRunner();
    let strEstatus: string;
    
    console.log('llego a getDetail y el id es'+ id);
    const _id= id.toString;
   // const cadena='select *   from detalle_prestamo where prestamoId='+id;
  //return  await  queryRunner.query(cadena);
  strEstatus = 'detalleprestamo.prestamoid = '+id.toString();
  console.log(strEstatus);

  
    return await this.detalleprestamoRepo.find({
      where: `${strEstatus}`,
   
    });
  }

  async getById(id: number): Promise<Prestamo> {
    return await this.prestamoRepo.findOne(id, {
      
    });
  }
  

  async create(prestamoDto: PrestamoDto): Promise<Prestamo> 
     {
      const queryRunner = getConnection().createQueryRunner();
     // await queryRunner.startTransaction();
      var i = 0;
      

        const detalle: DetallePrestamo[] = [];
        let nuevo = new Prestamo();
        let fecha = new Date();
     
        nuevo.cliente = prestamoDto.cliente;
        nuevo.importe = prestamoDto.importe;
        nuevo.interes = prestamoDto.interes;
         nuevo.tipo = prestamoDto.tipo;
        nuevo.fecha = new Date();
        nuevo.zona = prestamoDto.zona;
        console.log(prestamoDto.estado);
        nuevo.estado= prestamoDto.estado;
        
       
        nuevo.estatus = true;//prestamoDto.estatus;
        nuevo.cuotas =1;// prestamoDto.cuotas;
        nuevo.tasa = 80;//prestamoDto.tasa;
        nuevo.observacion="prestamoDto.observacion";
        console.log(nuevo.tasa);
        return await this.prestamoRepo.save(nuevo);
        //const prestamoGuardardo: Prestamo = await queryRunner.manager.save(nuevo);
        //console.log('metodo create');
        //const det = new DetallePrestamo();
     
        queryRunner.release();
     //   resolve(prestamoGuardardo);
        
        //console.log(prestamoGuardardo.id);
      
      ;
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
