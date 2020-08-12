import { Module } from '@nestjs/common';
import { TipoOperacionService } from './tipo-operacion.service';
import { TipoOperacionController } from './tipo-operacion.controller';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoOperacion } from '../entidades/tipo-operacion.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoOperacion]), AuthModule],
  providers: [TipoOperacionService, AuthService],
  controllers: [TipoOperacionController],
})
export class TipoOperacionModule {}
