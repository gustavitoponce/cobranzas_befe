import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Localidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

 

  @Column()
  estatus: boolean;

  @ManyToOne(type => Usuario, usuario => usuario.id)
  usuarioestatus: Usuario;

  @UpdateDateColumn()
  fechamodificacion: Date;

  @ManyToOne(type => Usuario, usuario => usuario.id)
  usuariomodificacion: Usuario;
}
