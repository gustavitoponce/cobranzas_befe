import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';

@Entity()
export class Documentacion
 {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: true })
  imagen: string;
  @Column({ nullable: true })
  idprestamo: number;


  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  estatus: boolean;
  
  @Column({ nullable: true })
  requerido: boolean;
  
  @ManyToOne(type => Usuario, usuario => usuario.id, {
    eager: true,
  })
  usuarioestatus: Usuario;

  @UpdateDateColumn()
  fechamodificacion: Date;

  @ManyToOne(type => Usuario, usuario => usuario.id, {
    eager: true,
  })
  usuariomodificacion: Usuario;
}


