import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get(":id")
  GetUserStatistics(@Param('id') id: number) {
    return this.usersService.findOnePerId(id);
  }
}