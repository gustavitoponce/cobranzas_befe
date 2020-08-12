import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './usuario.service';
import { AuthService } from '../auth/auth.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from '../entidades/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioService, AuthService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
