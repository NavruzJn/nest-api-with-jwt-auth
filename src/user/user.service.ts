import { Injectable } from '@nestjs/common';
import {CreateUser} from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../config.ts.example';
import { UserRO } from './user.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor() {}

  public async create(dto: CreateUser): Promise<UserRO> {
    const {username} = dto;
    console.log(username);
    const id = new Date().getTime();
    const newUser = { id, username };
    return this.buildUserRO(newUser);

  }

  public generateJWT(user: UserEntity) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      token: this.generateJWT(user),
    };

    return {user: userRO};
  }
}
