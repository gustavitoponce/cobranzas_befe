import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult, getConnection, Equal } from 'typeorm';
import { Documentacion } from '../entidades/documentacion.entity';
import { DocumentacionDto } from '../dto/documentacion.dto';
import { AuthService } from '../auth/auth.service';
import { MarcaService } from '../marca/marca.service';
import { CategoriaService } from '../categoria/categoria.service';
import { UnidadService } from '../unidad/unidad.service';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { Inventario } from '../entidades/inventario.entity';
import { InventarioService } from '../inventario/inventario.service';

@Injectable()
export class DocumentacionService {
  ROOT_APP: any = __dirname;

  private readonly relaciones = [
    // 'empresa',
    // 'unidad',
    // 'categoria',
    // 'usuarioestatus',
    // 'marca',
    // 'usuariomodificacion',
  ];
  constructor(
    @InjectRepository(Documentacion)
    private readonly documentacionRepo: Repository<Documentacion>,
    private authService: AuthService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private unidadService: UnidadService,
    private inventarioService: InventarioService,
  ) {}
  async getAll(id:number): Promise<Documentacion[]> {
    let strEstatus: string;
console.log('llego con el id ' )+id.toString();
    strEstatus = 'documentacion.idprestamo = '+id.toString();

    return await this.documentacionRepo.find({
      where: `${strEstatus}`,
      relations: this.relaciones,
      order: {
        id: 'ASC',
      },
    });
  }

  async getdoc(id: number): Promise<Documentacion[]> {
    let strEstatus: string;

    console.log('getdoc');
    strEstatus = 'documentacion.idprestamo = '+id.toString();
    return await this.documentacionRepo.find({
      where: `${strEstatus}`,
      relations: this.relaciones,
      order: {
        id: 'ASC',
      },
    });
  }

  async getById(id: number): Promise<Documentacion> {
    return await this.documentacionRepo.findOne(id, {
      // where : { empresa: Equal(this.authService.empresaActiva.id) }
    });
  }

  async getByCode(codigo: string) {
    return await this.documentacionRepo.findOne({
      where: {
        empresa: Equal(this.authService.empresaActiva.id),
        codigo,
      },
    });
  }

  async create(documentacion: DocumentacionDto): Promise<Documentacion> {
    return new Promise(async (resolve, reject) => {
      const queryRunner = getConnection().createQueryRunner();
      await queryRunner.startTransaction();

      try {
        const nuevoDocumentacion: Documentacion = new Documentacion();
        const inventario: Inventario = new Inventario();
       
        nuevoDocumentacion.nombre = documentacion.nombre;
        nuevoDocumentacion.descripcion = documentacion.descripcion;
      
        nuevoDocumentacion.imagen = documentacion.imagen;
nuevoDocumentacion.idprestamo=documentacion.idprestamo;
        nuevoDocumentacion.requerido=true;
       nuevoDocumentacion.estatus=true;
        //nuevoDocumentacion.estatus = documentacion.estatus;
        nuevoDocumentacion.usuarioestatus = documentacion.usuarioestatus;
        nuevoDocumentacion.usuariomodificacion = documentacion.usuariomodificacion;

        const documentacionBD: Documentacion = await queryRunner.manager.save(
          nuevoDocumentacion,
        );

        inventario.empresa = this.authService.empresaActiva;
        //inventario.producto = documentacionBD;
        inventario.stock = 0;
        inventario.usuariomodificacion = this.authService.usuarioActivo;

        await queryRunner.manager.getRepository(Inventario).save(inventario);

        await queryRunner.commitTransaction();
        await queryRunner.release();

        console.log('JSON ' + JSON.stringify(documentacionBD));

        resolve(documentacionBD);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        reject(error);
      }
    });
  }
  async update(id: number, documentacion: DocumentacionDto): Promise<Documentacion> {
    const documentacionActualizar = await this.documentacionRepo.findOne(id);
    //documentacionActualizar.codigo = documentacion.codigo;
    documentacionActualizar.nombre = documentacion.nombre;
    documentacionActualizar.descripcion = documentacion.descripcion;
    documentacionActualizar.imagen = documentacion.imagen;

    /*console.log(documentacion.barcode);

    documentacionActualizar.barcode = documentacion.barcode;

    documentacionActualizar.costo = documentacion.costo;
    documentacionActualizar.precio = documentacion.precio;
    documentacionActualizar.unidad = await this.unidadService.getById(
      documentacionActualizar.unidadId,
    );*/
    /*documentacionActualizar.stockminimo = documentacion.stockminimo;
    documentacionActualizar.marca = await this.marcaService.getById(
      documentacion.marcaId,
    );*/
   /* documentacionActualizar.categoria = await this.categoriaService.getById(
      documentacion.categoriaId,
    );*/
    if (documentacionActualizar.estatus !== documentacion.estatus) {
      documentacionActualizar.estatus = documentacion.estatus;
      documentacionActualizar.usuarioestatus = this.authService.usuarioActivo;

    /*  if (!documentacion.estatus) {
        const inventario: Inventario = await this.inventarioService.getByProductForSale(
          documentacionActualizar.codigo,
        );
        if (inventario.stock > 0) {
          throw new Error(`El producto no puede ser dado de baja hasta que se agote su stock,
                     actualmente hay en existencia ${inventario.stock}`);
        }
      }*/
    }
    documentacionActualizar.usuariomodificacion = this.authService.usuarioActivo;

    return await this.documentacionRepo.save(documentacionActualizar);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.documentacionRepo.delete(id);
  }

  async updateImage(imageName: string, id: number) {
    /*const productoActualizar = await this.productoRepo.findOne(id);

        if ( productoActualizar.imagen ) {
            const oldPath =  path.resolve(this.ROOT_APP + '/uploads/producto/' + productoActualizar.imagen);

            if ( fs.existsSync( oldPath ) ) {
                fs.unlinkSync( oldPath );
            }
        }
        productoActualizar.imagen = imageName;
        return await this.productoRepo.save(productoActualizar);*/
    return imageName;
  }

  async search(term: string, incluirInactivos: string) {
    let strEstatus: string;

    if (incluirInactivos === 'false') {
      strEstatus = 'AND Documentacion.estatus = true ';
    } else {
      strEstatus = 'AND 1=1';
    }

    return await this.documentacionRepo.find({
      where: `Documentacion.empresa = ${this.authService.empresaActiva.id}
             AND (LOWER(Documentacion.codigo) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Documentacion.nombre) LIKE '%${term.toLowerCase()}%'
             OR LOWER(Documentacion.descripcion) LIKE '%${term.toLowerCase()}%') ${strEstatus}`,
      relations: this.relaciones,
    });
  }
}
