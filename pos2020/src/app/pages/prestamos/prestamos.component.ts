import { Component, OnInit, IterableDiffers, DoCheck, ViewChild, ElementRef, ɵConsole  } from '@angular/core';
import { Prestamo } from '../../models/prestamo.model';
import { DPrestamo } from '../../models/dprestamo.model';
import { DetallePrestamo } from '../../models/detalle-prestamo.model';
import { IResponse } from '../../interfaces/response.interface';
import { PrestamoService } from '../../services/prestamo/prestamo.service';
import {DetallePrestamoService} from '../../services/detalleprestamo/detalleprestamo.service';
import { PersonaService } from '../../services/persona/persona.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Pais } from '../../models/Pais';
import { Provincia } from '../../models/provincia.js';
import { PaisService } from '../../services/pais/pais.service';
import {Documentacion} from '../../models/documentacion.model';
import { DocumentacionService } from "../../services/documentacion/documentacion.service";
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  private timeOutBusqueda = -1;
  public detalleprestamos: DetallePrestamo[];
  public prestamos: Prestamo[];
  differ: any;
  imagenSubir: File;
  imagenTemp: string;
  docus1: Documentacion = new Documentacion();
  public docus:Documentacion[]=[];
  public prestamo: Prestamo;
  formimagen: FormGroup;
  public detalleprestamo: DetallePrestamo;
  public esNuevo: boolean;
  public idprestamo:number;
  public incluirInactivos: boolean;
  documentaciones: Documentacion[] = [];
  documentacion: Documentacion = new Documentacion();
  paises = [];
  provincias = [];
  ciudades = [];
  SampleJson: any = [];

  public tiposPersona = [
    { value: 'Cliente', text: 'Cliente' },
    { value: 'Proveedor', text: 'Proveedor' },
  ];

  @ViewChild('cerrarModal') cerrarModal: ElementRef;
  constructor(
    public modalUploadService: ModalUploadService,
    private prestamoService: PrestamoService,
    public frmBuilder: FormBuilder,
    public subirarchivoService: SubirArchivoService,
    public documentacionService: DocumentacionService,
    differs: IterableDiffers,
    private paisService: PaisService,
  ) 
  {

    this.differ = differs.find([]).create(null);
    this.formimagen = this.frmBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipos: ['', [Validators.required]],
      importe: [1, [Validators.required]],
      cuotas: [1, [Validators.required]],
      codigo: [1, [Validators.required]],
      tasa: [1, [Validators.required]],
      zona: [1, [Validators.required]],
    });
    this.prestamos = [];
    this.prestamo = new Prestamo();
    this.detalleprestamos = [];
    
    this.detalleprestamo = new DetallePrestamo();
    
    this.cargarPrestamos();
    this.SampleJson = paisService.getDatos();

    this.SampleJson.forEach(el => {
      this.paises.push(el.pais);
    });

  }

 


  ngOnInit() {

  }
  mostrarModal(id: number) {
    console.log('hola mundo Viva Peron');
    console.log(id);
    if (id > -1) {
      this.modalUploadService.mostrarModal('producto', id);
    }
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

  saveDataField(imagen) {

    const documentoDto: any = Object();
    
    if (imagen != null) {
      documentoDto.imagen = imagen;
    }
 
    console.log(this.formimagen.controls.codigo.value);
    documentoDto.codigo =this.idprestamo;
    console.log(this.idprestamo);
    documentoDto.nombre = this.formimagen.controls.nombre.value;
    documentoDto.estatus = 1;
    documentoDto.idprestamo=this.idprestamo;
    console.log(documentoDto.idprestamo);
    documentoDto.descripcion = this.formimagen.controls.descripcion.value;
    documentoDto.requerido=1;
    //documentoDto.barcode = this.barcode;
console.log(this.esNuevo);
   
      console.log('savedatafield');
      this.documentacionService.registrar(documentoDto).subscribe();
      swal.fire('Producto', 'Se registro de manera Exitosa', 'success');
    
  }
  submit(id:number) {
    console.log('...............' + this.imagenSubir);
    if (this.esNuevo) {
      console.log('paso nuevo');
      console.log(id);
    } 

    if (this.imagenSubir != undefined) {
      this.subirarchivoService.subirArchivo(this.imagenSubir, 'producto', 1000)
        .then((resp: any) => {
          console.log('paso luego de subir imagen');
          console.log(resp.data);
          this.saveDataField(resp.data);
        })
        .catch(resp => {
      //    console.log(resp);
          swal.fire('Ops!!', 'Ocurrió un error al actualizar la imagen', 'error');
          throw new Error(resp);
        });
    } else {
      console.log('guardar sin imagen');
      this.saveDataField(null);
    }

  }


  cargarDocumentos(id: number) {
    window.setTimeout(() => {
     // this.prestamoService.consultarDetalle(id).subscribe((detalleprestamos: DetallePrestamo[]) => {
     //   this.detalleprestamos = detalleprestamos;
      this.documentacionService.consultarImagen(id).subscribe(( docu: Documentacion[] ) => {
        this.docus = docu;
 this.idprestamo=id;
        console.log(id);
        console.log(this.docus);
        
      });
    }, 100);
    this.modalUploadService.notificacion.subscribe((response: IResponse) => {
      this.docus.map((docu: Documentacion) => {
        if ( docu.id === response.data.id ) {
          docu.imagen = response.data.imagen;
        }
      });
  });
  console.log(this.docus);
  }



  cargarPrestamos2() {
    
    
      this.prestamoService.consultarTodo(this.incluirInactivos).subscribe((dprestamos: DPrestamo[]) => 
      {
        this.prestamos = dprestamos;
      
      });
     
    }
    
  
  cargarPrestamos() {
    console.log('detalleekdkkdkf');
    window.setTimeout(() => {
      this.prestamoService.consultarTodo(this.incluirInactivos).subscribe((prestamos: Prestamo[]) => {
        this.prestamos = prestamos;
    console.log(this.prestamos);  
      });
    }, 100);
    
  }

  cargarDetalle(id : number) {
    console.log(id,'nada en el id');
    window.setTimeout(() => {
      this.prestamoService.consultarDetalle(id).subscribe((detalleprestamos: DetallePrestamo[]) => {
        this.detalleprestamos = detalleprestamos;
      
      });
    }, 100);
    
  }
  verPrestamo(prestamo: Prestamo) {
    this.prestamo = prestamo;
    this.esNuevo = true;
  }
  editarPrestamo(prestamo: Prestamo) {
    this.prestamo = prestamo;
    this.esNuevo = true;
  }
  guardar(form: NgForm) {

    this.cerrarModal.nativeElement.click();

    if (this.esNuevo) {
      this.prestamoService.registrar(this.prestamo).subscribe(() => {
        this.cargarPrestamos();
      });
    } else {
      this.prestamoService.actualizar(this.prestamo.id, this.prestamo).subscribe(() => {
        this.cargarPrestamos(); 
        console.log('ok');
      });
    }
  }

  buscarPrestamos(termino: string) {
    if (termino.length <= 0) {

      this.cargarPrestamos();

    } else {
      if (this.timeOutBusqueda !== -1) {
        window.clearTimeout(this.timeOutBusqueda);
      }

      this.timeOutBusqueda = window.setTimeout(() => {

        this.timeOutBusqueda = -1;

        this.prestamoService.buscar(termino, this.incluirInactivos).subscribe((prestamos: Prestamo[]) => {
          this.prestamos = prestamos;
        });
      }, 400);
    }
  }

}
