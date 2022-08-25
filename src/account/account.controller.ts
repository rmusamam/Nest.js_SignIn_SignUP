import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Delete,
  Req,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import * as bcrypt from 'bcrypt';
import express, { Request, response, Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/register')
  async create(@Body() createAccountDto: CreateAccountDto) {
    const password = createAccountDto.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    createAccountDto.password = hash;
    return this.accountService.create(createAccountDto);
  }

  @Post('/login')
  async login(
    @Body() loginAccountDto: LoginAccountDto,
    @Res({ passthrough: true }) response: Response,
  ) {
     const token=await this.accountService.login(loginAccountDto);
     console.log("returned token in login controller: ",token);
     
      response.cookie('token', token)
     return token 
  }

  @Get('/cookies')
  findAll(@Req() request: Request) {
    console.log('the cookies req token:',request.cookies.token.access_token);
    
  }
}
