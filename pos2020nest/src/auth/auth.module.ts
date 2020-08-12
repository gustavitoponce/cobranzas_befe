import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsuarioService } from '../usuario/usuario.service';
import { AuthController } from './auth.controller';
import { Usuario } from '../entidades/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { EmpresaModule } from '../empresa/empresa.module';
import { EmpresaService } from '../empresa/empresa.service';
import { Empresa } from '../entidades/empresa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Empresa]),
    UsuarioModule,
    EmpresaModule,
  ],
  providers: [AuthService, UsuarioService, EmpresaService],
  controllers: [AuthController],
})
export class AuthModule {}
