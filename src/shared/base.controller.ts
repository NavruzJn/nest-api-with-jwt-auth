import { SECRET } from '../config.ts.example';
import * as jwt from 'jsonwebtoken';

export class BaseController {

  constructor() {}

  protected static getUserIdFromToken(authorization) {
    if (!authorization) return null;

    const token = authorization.split(' ')[1];
    const decoded: any = jwt.verify(token, SECRET);
    return decoded.id;
  }
}
