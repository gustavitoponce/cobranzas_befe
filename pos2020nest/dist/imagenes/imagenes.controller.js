"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fs = require("fs");
let ImagenesController = class ImagenesController {
    constructor() {
        this.ROOT_APP = __dirname;
    }
    getImage(response, tipo, img) {
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
};
__decorate([
    common_1.Get('/:tipo/:img'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('tipo')),
    __param(2, common_1.Param('img')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", void 0)
], ImagenesController.prototype, "getImage", null);
ImagenesController = __decorate([
    common_1.Controller('imagenes')
], ImagenesController);
exports.ImagenesController = ImagenesController;
//# sourceMappingURL=imagenes.controller.js.map