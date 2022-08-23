import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import {Account,AccountDocument} from './schemas/account.schema'
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AccountService {
  constructor(@InjectModel('Account') private account:Model<AccountDocument>) {}
  async create(createAccountDto: CreateAccountDto) {
    const newUser= await new this.account(createAccountDto).save()
    return newUser;
  }

async login(loginAccountDto:LoginAccountDto){
  const email=loginAccountDto.email
  const pass=loginAccountDto.password
  

  console.log('this is email: ',email);
  console.log('this is password: ',pass);
  
  const emailExist = await this.account.findOne({email:email})
  console.log('password from DB: ',emailExist.password);
  
  if(!emailExist)return 'error'
  else{
    console.log('email exists: ',emailExist);
    const password= await bcrypt.compare(emailExist.password,pass)
  
    console.log('this is hash password : ',password);
  
    return 'ok'

  }
  
  // console.log('this is login email exist : ',emailExist);
  // return 'this is login function'
}


  // findAll() {
  //   return `This action returns all account`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
