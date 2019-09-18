import { Post, Body, Controller, UsePipes, Get } from "@nestjs/common";
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUser } from './dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import {
  ApiUseTags,
  ApiBearerAuth
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('user') userData: CreateUser) {
    return await this.userService.create(userData);
  }

  @Get('users')
  async getAll() {
    return {};
  }
}
