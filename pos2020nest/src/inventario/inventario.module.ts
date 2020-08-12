import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from '../entidades/persona.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { Inventario } from '../entidades/inventario.entity';
import { Operacion } from '../entidades/operacion.entity';
import { TipoOperacionService } from '../tipo-operacion/tipo-operacion.service';
import { TipoOperacion } from '../entidades/tipo-operacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario, Operacion, TipoOperacion]),
    AuthModule,
  ],
  providers: [InventarioService, AuthService, TipoOperacionService],
  controllers: [InventarioController],
})
export class InventarioModule {}
