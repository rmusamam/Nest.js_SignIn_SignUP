import { Inject, Module,forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from 'src/account/account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

console.log(PassportModule);

@Module({  
  imports: [
    // forwardRef(() => AccountModule),

    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}

