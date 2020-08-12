import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  Unique,
  OneToOne,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Empresa } from './empresa.entity';
import { Operacion } from './operacion.entity';
import { Producto } from './producto.entity';
import { Prestamo } from './prestamo.entity';
@Entity()
export class DetallePrestamo {
  @PrimaryGeneratedColumn()
  id: number;
  

  

  @ManyToOne(type => Prestamo, prestamo => prestamo.id,  {
    eager: true,
  })
  prestamo: Prestamo;




 /* @Column({ nullable: true })
  prestamoId: number;*/
  @Column({ nullable: true })
  nrocuota: number;

  @Column( 'decimal', {precision: 8, scale: 2, nullable:true })
  capital: number;
  @Column('decimal', { precision: 8, scale: 2, nullable: true })
  interes: number;

  @Column({ nullable:true })
  vencimiento: Date;

  @Column({ nullable:true })
  fechapago: Date;
}
