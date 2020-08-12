import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor() { }

  getDatos() {
    return [
      {
        "pais": {
          "codigo": 0,
          "descripcion": "Italia"
        },
        "provincia": "Roma",
        "ciudad": "Fiumicino"
      },
      {
        "pais": {
          "codigo": 0,
          "descripcion": "Italia"
        },
        "provincia": "Roma",
        "ciudad": "Roma"
      },
      {
        "pais": {
          "codigo": 0,
          "descripcion": "Italia"
        },
        "provincia": "Roma",
        "ciudad": "Tívoli"
      },
      {
        "pais": {
          "codigo": 0,
          "descripcion": "Italia"
        },
        "provincia": "Milán",
        "ciudad": "Milán"
      },
      {
        "pais": {
          "codigo": 1,
          "descripcion": "Argentina"
        },
        "provincia": "Buenos Aires",
        "ciudad": "La Plata"
      },
      {
        "pais": {
          "codigo": 1,
          "descripcion": "Argentina"
        },
        "provincia": "Buenos Aires",
        "ciudad": "Olavarría"
      },
      {
        "pais": {
          "codigo": 2,
          "descripcion": "Mexico"
        },
        "provincia": "Yucatán",
        "ciudad": "Mérida"
      },
      {
        "pais": {
          "codigo": 2,
          "descripcion": "Mexico"
        },
        "provincia": "Sonora",
        "ciudad": "Ciudad Obregón"
      },
      {
        "pais": {
          "codigo": 2,
          "descripcion": "Mexico"
        },
        "provincia": "Sonora",
        "ciudad": "Hermosillo"
      },
      {
        "pais": {
          "codigo": 2,
          "descripcion": "Mexico"
        },
        "provincia": "Sonora",
        "ciudad": "Agua Prieta"
      },
      {
        "pais": {
          "codigo": 2,
          "descripcion": "Mexico"
        },
        "provincia": "Quintana Roo",
        "ciudad": "Cancún"
      },
      {
        "pais": {
          "codigo": 0,
          "descripcion": "Italia"
        },
        "provincia": "Pesaro y Urbino",
        "ciudad": "Pesaro"
      },
      {
        "pais": {
          "codigo": 3,
          "descripcion": "Venezuela"
        },
        "provincia": "Lara",
        "ciudad": "Barquisimeto"
      },
      {
        "pais": {
          "codigo": 2,
          "descripcion": "Mexico"
        },
        "provincia": "Aguascalientes",
        "ciudad": "Aguascalientes"
      },
      {
        "pais": {
          "codigo": 4,
          "descripcion": "Panama"
        },
        "provincia": "Panamá",
        "ciudad": "San Miguelito "
      },
      {
        "pais": {
          "codigo": 5,
          "descripcion": "Uruguay"
        },
        "provincia": "Paysandú",
        "ciudad": "Paysandú "
      },
      {
        "pais": {
          "codigo": 6,
          "descripcion": "USA"
        },
        "provincia": "Texas",
        "ciudad": "Houston"
      },
      {
        "pais": {
          "codigo": 4,
          "descripcion": "Panama"
        },
        "provincia": "Panamá",
        "ciudad": "Panamá"
      },
      {
        "pais": {
          "codigo": 4,
          "descripcion": "Panama"
        },
        "provincia": "Veraguas",
        "ciudad": "Santiago"
      },
      {
        "pais": {
          "codigo": 4,
          "descripcion": "Panama"
        },
        "provincia": "Chiriquí",
        "ciudad": "David"
      },
      {
        "pais": {
          "codigo": 1,
          "descripcion": "Argentina"
        },
        "provincia": "Buenos Aires",
        "ciudad": "Bahía Blanca"
      },
      {
        "pais": {
          "codigo": 1,
          "descripcion": "Argentina"
        },
        "provincia": "Buenos Aires",
        "ciudad": "Azul"
      },
      {
        "pais": {
          "codigo": 1,
          "descripcion": "Argentina"
        },
        "provincia": "Tierra del Fuego",
        "ciudad": "Ushuaia"
      },
      {
        "pais": {
          "codigo": 1,
          "descripcion": "Argentina"
        },
        "provincia": "Misiones",
        "ciudad": "Posadas"
      },
      {
        "pais": {
          "codigo": 6,
          "descripcion": "USA"
        },
        "provincia": "Florida",
        "ciudad": "Miami"
      },
      {
        "pais": {
          "codigo": 6,
          "descripcion": "USA"
        },
        "provincia": "California",
        "ciudad": "Los Ángeles"
      }
    ];
  }
}
