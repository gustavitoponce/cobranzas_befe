import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Estado } from './estado.entity';
import { Persona } from './persona.entity';
@Entity()
export class Prestamo {
  @PrimaryGeneratedColumn()
  id: number;

  //@Column({ nullable: true })
  //cliente: number;

  @ManyToOne(type => Persona, persona => persona.id, {
    eager: true,
  })
  cliente: Persona;


  @Column({ nullable: true })
  cuotas: number;

  @Column({ nullable: true })
  estatus: boolean;

  @Column({ nullable: true })
  fecha: Date;

  @Column({ nullable: true })
  importe: number;

  @Column({ nullable: true })
  zona: number;

  @Column({ nullable: true })
  interes: number;
  @Column({ nullable: true })
  tasa: number;
  @Column({ nullable: true })
  tipo: number;
  @Column({ nullable: true })
  usuarioAlta: number;

  @Column({ type:"mediumtext", nullable: true })
  observacion: string;

  @ManyToOne(type => Usuario, usuario => usuario.id, {
    eager: true,
  })
  usuariomodificacion: Usuario;

  @ManyToOne(type => Estado, estado => estado.id, {
    eager: true,
  })
  estado: Estado;

   @ManyToOne(type => Usuario, usuario => usuario.id)
     usuarioestatus: Usuario;
 
     @UpdateDateColumn()
     fechamodificacion: Date;
 
     
    }