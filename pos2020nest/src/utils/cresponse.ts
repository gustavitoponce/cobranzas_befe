import { IToken } from '../utils/IToken';
import { Status } from '../utils/Status';

export class CResponse {
  constructor(
    public status: Status,
    public message: string,
    public token?: IToken,
    public data?: any,
    public error?: any,
  ) {
    data = [];
  }
}
