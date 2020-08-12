import { Controller, Get, Res, Param } from '@nestjs/common';
import * as fs from 'fs';

@Controller('imagenes')
export class ImagenesController {
  ROOT_APP: any = __dirname;

  @Get('/:tipo/:img')
  getImage(
    @Res() response,
    @Param('tipo') tipo: string,
    @Param('img') img: number,
  ) {
    let tmp = this.ROOT_APP.replace('\\imagenes', '');
    let path = `${tmp}\\upload\\uploads\\${tipo}\\${img}`;

    console.log('path en servidor ' + path);

    fs.exists(path, existe => {
      if (!existe) {
        path = `${this.ROOT_APP}\\assets\\no-img.jpg`;
      }

      response.sendFile(path);
    });
  }
}
