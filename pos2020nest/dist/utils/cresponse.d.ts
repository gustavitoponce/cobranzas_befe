import { IToken } from '../utils/IToken';
import { Status } from '../utils/Status';
export declare class CResponse {
    status: Status;
    message: string;
    token?: IToken;
    data?: any;
    error?: any;
    constructor(status: Status, message: string, token?: IToken, data?: any, error?: any);
}
