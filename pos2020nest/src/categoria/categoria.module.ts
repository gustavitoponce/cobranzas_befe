import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { Categoria } from '../entidades/categoria.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), AuthModule],
  controllers: [CategoriaController],
  providers: [CategoriaService, AuthService],
})
export class CategoriaModule {}
