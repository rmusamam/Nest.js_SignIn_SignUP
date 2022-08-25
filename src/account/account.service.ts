import { HttpException, Injectable,forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { Account, AccountDocument } from './schemas/account.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {AuthService} from '../auth/auth.service'

@Injectable()
export class AccountService {
  constructor( @Inject(forwardRef(() => AuthService))
    @InjectModel('Account') private account: Model<AccountDocument>,private authService:AuthService
  ) {}
  async create(createAccountDto: CreateAccountDto) {
    const newUser = await new this.account(createAccountDto).save();
    return newUser;
  }

  async login(loginAccountDto: LoginAccountDto) {
    const email = loginAccountDto.email;
    const pass = loginAccountDto.password;

    console.log('this is email: ', email);
    console.log('this is password: ', pass);

    const emailExist = await this.account.findOne({ email: email });
    console.log('password from DB: ', emailExist);

    if (!emailExist) {
      throw new HttpException('Email not found', 200);
    } else {
      const password = await bcrypt.compare(pass, emailExist);
      console.log('when password is compared');
      
      if (password) {
        console.log('when password is matched');
        const token = await this.authService.login(emailExist)
        console.log(token)
      } else {
        throw new HttpException('password  not found', 200);
      }
    }

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
