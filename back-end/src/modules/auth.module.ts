import { Module } from '@nestjs/common';
import { UserModule } from '../modules/user.module';
import { AuthService } from 'src/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from 'src/resolvers/auth.resolver';
import { JwtStrategy } from 'src/auth/jwt.strategy';


@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy],
    exports: [AuthService],

})
export class AuthModule { }