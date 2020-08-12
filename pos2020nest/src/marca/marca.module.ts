import { Module } from '@nestjs/common';
import { MarcaController } from './marca.controller';
import { MarcaService } from './marca.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from '../entidades/marca.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Marca]), AuthModule],
  controllers: [MarcaController],
  providers: [MarcaService, AuthService],
})
export class MarcaModule {}
