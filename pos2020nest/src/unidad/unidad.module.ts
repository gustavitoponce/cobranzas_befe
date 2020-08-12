import { Module } from '@nestjs/common';
import { UnidadController } from './unidad.controller';
import { UnidadService } from './unidad.service';
import { Unidad } from '../entidades/unidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Unidad]), AuthModule],
  controllers: [UnidadController],
  providers: [UnidadService, AuthService],
})
export class UnidadModule {}
