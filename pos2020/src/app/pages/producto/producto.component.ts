import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Unidad } from '../../models/unidad.model';
import { Categori } from '../../models/categori.model';
import { Marca } from '../../models/marca.model';
import { UnidadService } from '../../services/unidad/unidad.service';
import { MarcaService } from '../../services/marca/marca.service';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Observable } from 'rxjs/Observable';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { IResponse } from '../../interfaces/response.interface';
import { ConfiguracionService } from '../../services/configuracion/configuracion.service';
import { Configuracion } from '../../models/configuracion.model';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  @ViewChild('codigo') ElCodigo: ElementRef;

  producto: Producto = new Producto();
  unidades: Unidad[] = [];
  categorias: Categori[] = [];
  marcas: Marca[] = [];
  configuraciones: Configuracion[] = [];
  form: FormGroup;
  esNuevo: boolean;
  porcentajeUtilidadSugerida: number;

  imagenSubir: File;
  imagenTemp: string;
  barcode: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private unidadService: UnidadService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private modalUploadService: ModalUploadService,
    private configuracionService: ConfiguracionService,
    private subirarchivoService: SubirArchivoService
  ) {
    this.inicializarForm();
  }

  ngOnInit() {

    this.unidadService.consultarTodo().subscribe((unidades: Unidad[]) => {
      this.unidades = unidades;
    });

    this.marcaService.consultarTodo(false).subscribe((marcas: Marca[]) => {
      this.marcas = marcas;
    });

    this.categoriaService.consultarTodo(false).subscribe((categorias: Categori[]) => {
      this.categorias = categorias;
    });

    /*this.configuracionService.consultarPorCodigo('PORCENTAJE_UTILIDAD_SUGERIDA').subscribe((configuraciones: Configuracion ) => {
        if ( configuraciones ) {
          this.porcentajeUtilidadSugerida = Number(configuraciones.valor);
        }
    });*/

    this.porcentajeUtilidadSugerida = Number(100);

    this.activatedRoute.params.subscribe((params) => {
      this.esNuevo = false;
      this.porcentajeUtilidadSugerida = 20;
      this.form.controls.codigo.clearAsyncValidators();

      if (params.id !== 'nuevo') {

        this.productoService.consultarPorId(params.id).subscribe((producto: Producto) => {

          if (producto) {

            this.producto = producto;

            const formValor = {
              codigo: producto.codigo,
              nombre: producto.nombre,
              descripcion: producto.descripcion,
              costo: producto.costo,
              precio: producto.precio,
              unidad: producto.unidad.id,
              stockminimo: producto.stockminimo,
              marca: producto.marca.id,
              categoria: producto.categoria.id,
              estatus: producto.estatus,
            };
            console.log('quiero imagen ' + producto.imagen);
            this.barcode = producto.barcode;

            this.form.setValue(formValor);
          } else {
            this.inicializarForm();
          }
        });
      } else {
        this.inicializarForm();
        window.setTimeout(() => {
          this.ElCodigo.nativeElement.focus();
        }, 100);
      }

    });

    this.modalUploadService.notificacion.subscribe((response: IResponse) => {
      this.producto.imagen = response.data.imagen;
    });
  }


  seleccionImage(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result as string;

  }


  private inicializarForm() {
    this.esNuevo = true;
    this.producto = new Producto();
    const regExpDecimales = new RegExp(/^(((\d{1,3})(,\d{3})*)|(\d+))(.\d+)?$/);

    this.form = new FormGroup({
      codigo: new FormControl('', Validators.required),
      // barcode:       new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      costo: new FormControl('', [Validators.required, Validators.pattern(regExpDecimales), Validators.min(1)]),
      precio: new FormControl('', [Validators.required, Validators.pattern(regExpDecimales), Validators.min(1)]),
      unidad: new FormControl(null, Validators.required),
      stockminimo: new FormControl('', [Validators.required, Validators.min(0)]),
      marca: new FormControl(null, Validators.required),
      categoria: new FormControl(null, Validators.required),
      estatus: new FormControl(true)
    });

    // this.form.controls.codigo.setAsyncValidators(this.existeCodigo.bind(this));
  }

  mostrarModal(id: number) {
    console.log('hola mundo');
    if (id > -1) {
      this.modalUploadService.mostrarModal('producto', id);
    }
  }
  existeCodigo(control: FormControl): Promise<any> | Observable<any> {
    return this.productoService.existeCodigo(control.value);
  }


  saveDataField(imagen) {

    const productoDto: any = Object();

    if (imagen != null) {
      productoDto.imagen = imagen;
    }

    productoDto.codigo = this.form.controls.codigo.value;
    productoDto.nombre = this.form.controls.nombre.value;
    productoDto.descripcion = this.form.controls.descripcion.value;
    productoDto.costo = this.form.controls.costo.value;
    productoDto.precio = this.form.controls.precio.value;
    productoDto.unidadId = this.form.controls.unidad.value;
    productoDto.stockminimo = this.form.controls.stockminimo.value;
    productoDto.marcaId = this.form.controls.marca.value;
    productoDto.categoriaId = this.form.controls.categoria.value;
    productoDto.estatus = this.form.controls.estatus.value;
    productoDto.barcode = this.barcode;

    if (this.esNuevo) {
      this.productoService.registrar(productoDto).subscribe();
      swal.fire('Producto', 'Se registro de manera Exitosa', 'success');
    } else {
      this.productoService.actualizar(this.producto.id, productoDto).subscribe();
      swal.fire('Producto', 'Se actualizo el Producto de manera  Exitosa', 'success');
    }

  }
  submit() {
    console.log('...............' + this.imagenSubir);
    if (this.esNuevo) {
      console.log('paso nuevo');

    } else {
      console.log('paso modificar');
    }

    if (this.imagenSubir != undefined) {
      this.subirarchivoService.subirArchivo(this.imagenSubir, 'producto', 1000)
        .then((resp: any) => {
          console.log('paso luego de subir imagen');
          console.log(resp.data);
          this.saveDataField(resp.data);
        })
        .catch(resp => {
          swal.fire('Ops!!', 'Ocurrió un error al actualizar la imagen', 'error');
          throw new Error(resp);
        });
    } else {
      console.log('guardar sin imagen');
      this.saveDataField(null);
    }

  }

  entrada(event) {
    try {
      const valorPrecio = Math.ceil(Number((Number(event.target.value) * (1 + (this.porcentajeUtilidadSugerida / 100))).toFixed(2)));
      this.form.controls.precio.setValue(valorPrecio.toString());
    } catch (e) {

    }
  }

}
