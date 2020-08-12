import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetallePrestamoService } from './detalleprestamo.service';
import { DetallePrestamoController } from './detalleprestamo.controller';

import { DetallePrestamo } from '../entidades/detalle-prestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePrestamo])],
  providers: [DetallePrestamoService],
  controllers: [DetallePrestamoController],
})
export class DetallePrestamoModule {}
