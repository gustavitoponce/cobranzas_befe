import { Module } from '@nestjs/common';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { Persona } from '../entidades/persona.entity';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Persona]), AuthModule],
  controllers: [PersonaController],
  providers: [PersonaService, AuthService],
})
export class PersonaModule {}
