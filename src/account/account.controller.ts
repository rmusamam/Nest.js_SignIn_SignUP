import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import * as bcrypt from 'bcrypt'


@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/register')
  async create(@Body() createAccountDto: CreateAccountDto) {
    const password= createAccountDto.password
    const salt =await bcrypt.genSalt()
    const hash= await bcrypt.hash(password,salt)
    createAccountDto.password=hash
    return this.accountService.create(createAccountDto);
  }

  @Post('/login')
  async login(@Body() loginAccountDto:LoginAccountDto){
      return this.accountService.login(loginAccountDto)
  }

  // @Get()
  // findAll() {
  //   return this.accountService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
  //   return this.accountService.update(+id, updateAccountDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountService.remove(+id);
  // }
}
