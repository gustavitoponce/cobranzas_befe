import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { PaisService } from 'src/app/services/pais/pais.service';
import { NgForm } from '@angular/forms';
import { Producto } from 'src/app/models/producto.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientenuevo',
  templateUrl: './clientenuevo.component.html',
  styleUrls: ['./clientenuevo.component.css']
})
export class ClientenuevoComponent implements OnInit {

  producto: Producto = new Producto();
  
  private timeOutBusqueda = -1;
  public personas: Persona[];
  public persona: Persona;
  public esNuevo: boolean;
  public incluirInactivos: boolean;

  paises = [];
  provincias = [];
  ciudades = [];
  SampleJson: any = [];

  imagenSubir: File;
  imagenTemp: string;

  public tiposPersona = [
    { value: 'Cliente', text: 'Cliente' },
    { value: 'Proveedor', text: 'Proveedor' },
  ];

  constructor(
    private personaService: PersonaService,
    private paisService: PaisService
  ) {
    this.personas = [];
    this.persona = new Persona();
    this.esNuevo = false;
    this.cargarPersonas();
    this.SampleJson = paisService.getDatos();

    this.SampleJson.forEach(el => {
      this.paises.push(el.pais);
    });
console.log(this.paises);
  }

  ngOnInit() {
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

  onSelectPais(pais) {
    this.provincias = [];
    this.SampleJson.forEach(element => {
      if (element.pais == pais) {
        this.provincias.push(element.provincia);
      }
    });
    console.log(`Provincias de ${pais}: ${this.provincias}`)
  }

  onSelectProvincia(provincia) {
    this.ciudades = [];
    this.SampleJson.forEach(element => {
      if (element.provincia == provincia) {
        this.ciudades.push(element.ciudad);
      }
    });
    console.log(`Ciudades de ${provincia}: ${this.ciudades}`)
  }




  cargarPersonas() {
    window.setTimeout(() => {
      this.personaService.consultarTodo(this.incluirInactivos).subscribe((personas: Persona[]) => {
        this.personas = personas;
      });
    }, 100);
  }

  nuevaPersona() {
    this.persona = new Persona();
    this.esNuevo = true;
  }
  editarPersona(persona: Persona) {
    this.persona = persona;
    this.esNuevo = false;
  }
  guardar(form: NgForm) {

    //this.cerrarModal.nativeElement.click();

    if (this.esNuevo) {
      this.personaService.registrar(this.persona).subscribe(() => {
        this.cargarPersonas();
      });
    } else {
      this.personaService.actualizar(this.persona.id, this.persona).subscribe(() => {
        this.cargarPersonas();
      });
    }
  }

  buscarPersonas(termino: string) {
    if (termino.length <= 0) {

      this.cargarPersonas();

    } else {
      if (this.timeOutBusqueda !== -1) {
        window.clearTimeout(this.timeOutBusqueda);
      }

      this.timeOutBusqueda = window.setTimeout(() => {

        this.timeOutBusqueda = -1;

        this.personaService.buscar(termino, this.incluirInactivos).subscribe((personas: Persona[]) => {
          this.personas = personas;
        });
      }, 400);
    }
  }


}
