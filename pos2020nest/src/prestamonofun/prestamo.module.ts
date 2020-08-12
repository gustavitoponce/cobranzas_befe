import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoService } from './prestamo.service';
import { PrestamoController } from './prestamo.controller';
import { Prestamo } from '../entidades/prestamo.entity';
import { DetallePrestamo } from '../entidades/detalle-prestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo, DetallePrestamo]),
  ],
  providers: [PrestamoService,],
  controllers: [PrestamoController],
})
export class PrestamoModule {}
