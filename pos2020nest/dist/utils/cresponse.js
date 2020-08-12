"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CResponse {
    constructor(status, message, token, data, error) {
        this.status = status;
        this.message = message;
        this.token = token;
        this.data = data;
        this.error = error;
        data = [];
    }
}
exports.CResponse = CResponse;
//# sourceMappingURL=cresponse.js.map