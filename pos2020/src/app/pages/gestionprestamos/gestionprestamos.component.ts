import { Component, OnInit, IterableDiffers, DoCheck, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { SharedService } from '../../services/shared/shared.service';
import { ProductoService } from '../../services/producto/producto.service';
import { Producto } from '../../models/producto.model';
import { Operacion } from '../../models/operacion.model';
import { TipoOperacion } from '../../models/tipo-operacion.model';
import { DetalleOperacion } from '../../models/detalle-operacion.model';
import { TipoOperacionService } from '../../services/tipo-operacion/tipo-operacion.service';
import { PersonaService } from '../../services/persona/persona.service';
import { Persona } from '../../models/persona.model';
import { ZonaService } from "../../services/zona/zona.service";
import { Zona } from '../../models/zona.model';
import { Prestamo } from '../../models/prestamo.model';
import {Documentacion} from '../../models/documentacion.model';
import { DocumentacionService } from "../../services/documentacion/documentacion.service";
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { IResponse } from '../../interfaces/response.interface';
import { DetallePrestamo } from '../../models/detalle-prestamo.model';
import { PrestamoService } from '../../services/prestamo/prestamo.service';
import { DetallePrestamoService } from '../../services/detalleprestamo/detalleprestamo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { OperacionService } from '../../services/operacion/operacion.service';
import { InventarioService } from '../../services/inventario/inventario.service';
import { Inventario } from '../../models/inventario.model';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-gestionprestamos',
  templateUrl: './gestionprestamos.component.html',
  styleUrls: ['./gestionprestamos.component.css']
})
export class GestionPrestamosComponent implements OnInit {
  clientes: Persona[] = [];
  clienteDefault: Persona;
  productos: Producto[] = [];
  docus:Documentacion[]=[];

  zona: Zona;
  formulario: FormGroup;
  zonas: Zona[] = [];
  operacion: Operacion;
  differ: any;
  pantallaCompleta = false;

  private timeOutBusqueda = -1;

  prestamos: Prestamo[] = [];
  prestamo: Prestamo = new Prestamo();
  detalleprestamos: DetallePrestamo[] = [];
  detalleprestamo: DetallePrestamo = new DetallePrestamo();
  documentaciones: Documentacion[] = [];
  documentacion: Documentacion = new Documentacion();
  esNuevo = false;
  incluirInactivos = false;


  @ViewChild(PerfectScrollbarComponent) public scrollListadoProd: PerfectScrollbarComponent;

  constructor(
    public modalUploadService: ModalUploadService,
    private router: Router,
    public frmBuilder: FormBuilder,
    private inventarioService: InventarioService,
    private tipoOperacionService: TipoOperacionService,
    private personaService: PersonaService,
    private operacionService: OperacionService,
    public zonaService: ZonaService,
    public prestamoService: PrestamoService,
    public detalleprestamoService: DetallePrestamoService,
    public documentacionService: DocumentacionService,
    differs: IterableDiffers,
  ) {
   

    this.operacion = new Operacion();
    this.differ = differs.find([]).create(null);
    this.formulario = this.frmBuilder.group({
      nombre: ['', [Validators.required]],
      tipos: ['', [Validators.required]],
      importe: [1, [Validators.required]],
      cuotas: [1, [Validators.required]],
      tasa: [1, [Validators.required]],
      zona: [1, [Validators.required]],
    });

    this.zona = new Zona();
    this.zonaService.cargarZonas(true).subscribe((zonas: Zona[]) => {
      console.log("hola" + JSON.stringify(zonas));
      this.zonas = zonas;
      this.zonaDefault();
    });

  }
  zonaDefault() {
    let recordarZona: Zona = null;

    if (localStorage.getItem('recordar_zona') != null) {

      recordarZona = JSON.parse(localStorage.getItem('recordar_zona')) as Zona;

    }

    if (recordarZona) {

      this.zona = this.zonas.find(x => x.id === recordarZona.id);

    } else {
      this.zona = this.zonas[0];
    }
  }


  public tiposCreditos = [
    { value: 'Diarios', text: 'Diarios', tipo: 1 },
    { value: 'Semanal', text: 'Semanal', tipo: 7 },
    { value: 'Quincenal', text: 'Quincenal', tipo: 15 },
    { value: 'Mensual', text: 'Mensual', tipo: 30 },
  ];
  ngOnInit() {
    this.tipoOperacionService.consultarPorCodigo('VENTA').subscribe((ventaTO: TipoOperacion) => {
      this.operacion.tipooperacion = ventaTO;
    });

    this.cargarPersonas();


    this.personaService.consultarDefaultParaVenta().subscribe((clienteDefault: Persona) => {
      this.operacion.persona = clienteDefault;
      this.clienteDefault = clienteDefault;
    });
  }

  ngDoCheck() {
    const change = this.differ.diff(this.operacion.detalleOperacion);

    if (change) {
      const detalle: DetalleOperacion[] = change.collection as DetalleOperacion[];

    }
  }






  highlight(detalleOperacion: DetalleOperacion) {
    if (detalleOperacion.highlight) {
      detalleOperacion.highlight = false;
    }

    detalleOperacion.highlight = true;
    window.setTimeout(() => {
      detalleOperacion.highlight = false;
    }, 700);
  }
  mostrarModal( id: number ) {
    this.modalUploadService.mostrarModal( 'producto', id );
  }
  mantenerScrollAbajo() {
    try {
      window.setTimeout(() => {
        this.scrollListadoProd.directiveRef.scrollToBottom(0, 100);
      }, 50);
    } catch (err) {

    }
  }

onSubmit(parametro:FormGroup)
{
  const a= parametro.controls.importe.value;
  console.log(a);
console.log(parametro);
}

cargarDocumentos() {
  window.setTimeout(() => {
    this.documentacionService.consultarTodo(this.incluirInactivos).subscribe(( docu: Documentacion[] ) => {
      this.docus = docu;
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
  cargarPersonas() {
    this.personaService.consultarTodo().subscribe((personas: Persona[]) => {
      this.clientes = personas.filter(x => x.tipo.toUpperCase() === 'CLIENTE' && !x.esPersonaVentaPublico);
    });
  }
  buscarPersona(term: string) {
    if (term.length > 0) {
      this.personaService.buscar(term).subscribe((personas: Persona[]) => {
        this.clientes = personas.filter(x => x.tipo.toUpperCase() === 'CLIENTE' && !x.esPersonaVentaPublico);
      });
    } else {
      this.cargarPersonas();
    }
  }

  seleccionarPersona(persona: Persona) {
    this.operacion.persona = persona;
  }

  crear_grilla() {
    console.log('simulador.component.ts metodo crear_grilla');
    var fecha = new Date();
    var importe = (<HTMLInputElement>document.getElementById('importe')).value;
    var cant_cuotas = Number((<HTMLInputElement>document.getElementById('cuotas')).value);
    document.getElementById("simulador").style.visibility = "visible";
    // console.log(_cuotas);
    // console.log(_prestamo);
    console.log(importe);

    //console.log(x);
    var vector_cuotas = [];
    var j = 1;
    var i = 0;
    for (j = 1; j <= cant_cuotas; j++) {

      vector_cuotas.push({ cuota: j, importe_cuota: Number(importe) / cant_cuotas });

    }
    this.prestamo.interes = ((this.prestamo.importe * this.prestamo.tasa) / 100) * this.prestamo.cuotas;
    this.prestamo.cliente = this.operacion.persona;
    console.log(this.prestamo.interes);
    // this.prestamo.usuarioAlta=this.operacion.usuariomodificacion.id;
    console.log(vector_cuotas);

    var tabla = "<table  class=\"table table-hover stylish-table\" data-page-size=\"10\" >";
    tabla += "<tr><th>Cuota</th> <th>Capital</th> <th>Interes</th> <th>Valor Cuota</th> <th>Vence</th>";
    tabla += "</tr>";

    for (i = 0; i < cant_cuotas; i++) {
      tabla += "<tr>";
      tabla += "<td>" + (i + 1) + "</td>";

      fecha.setDate(fecha.getDate() + parseInt(this.prestamo.tipo));
      console.log(vector_cuotas[i].importe_cuota);
      tabla += "<td >" + vector_cuotas[i].importe_cuota + "</td>" + "<td>" + this.prestamo.interes / this.prestamo.cuotas + "</td>" + "<td>" + ((this.prestamo.interes / this.prestamo.cuotas) + vector_cuotas[i].importe_cuota) + "</td>" + "<td>" + fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + "</td>";

      tabla += "</tr>";
    }
    tabla += "</table> ";
    var boton = " <div class=\"col-12 mt-5\"> <button type=\"button \" (click)='guardar()' class=\"btn btn-info btn-rounded\"  data-toggle=\"modal\">   Grabar </button> </div>";
    tabla = tabla;//+boton;
    document.getElementById("resultado").innerHTML = tabla;
  }
  establecerClienteDefault() {
    this.operacion.persona = this.clienteDefault;
  }
  resetearSimulacion() {
    document.getElementById("simulador").style.visibility = "hidden";

  }

  guardar() {

    
    this.prestamo.cliente = this.operacion.persona;
    this.prestamo.importe = this.formulario.controls.importe.value;
    this.prestamo.tasa    = this.formulario.controls.tasa.value;
    this.prestamo.cuotas  = this.formulario.controls.cuotas.value;
    this.prestamo.tipo    = this.formulario.controls.tipos.value;
    this.prestamo.zona    = this.formulario.controls.zona.value;
   // this.prestamo.usuarioAlta =  JSON.parse(localStorage.getItem("usuario"));
  
    this.prestamo.interes = ((this.prestamo.importe * this.prestamo.tasa) / 100) * this.prestamo.cuotas;

    console.log(this.prestamo);
        this.prestamoService.registrar(this.prestamo).subscribe(() => { });
    //la idea es obtener el id generado para lo almacene aqui this.detalleprestamo.prestamoId
    // y asi grabar todo el detalle
    //   this.detalleprestamoService.registrardetalle(this.detalleprestamo).subscribe(() => {  });


  }


}
