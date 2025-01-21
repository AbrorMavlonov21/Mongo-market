import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ResData } from 'lib/resData';
import { UserCEntity } from '../user-c/entities/user-c.entity';
import { IUserCService } from '../user-c/interfaces/iuser-c.service';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'lib/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserCService')
    private readonly userCService: IUserCService,
    private readonly jwtService: JwtService,
  ) {}
  async login(dto: CreateAuthDto): Promise<ResData<UserCEntity>> {
    const foundUser = await this.userCService.getByLogin(dto.login);
    console.log(1);

    if (!foundUser) {
      throw new HttpException(
        'login or password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log(2);
    const validPassword = await Bcrypt.compare(
      dto.password,
      foundUser.data.password,
    );

    console.log(3);
    if (!validPassword) {
      throw new HttpException(
        'login or password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log(4);
    const token = await this.jwtService.signAsync({
      id: foundUser.data.id,
      roles: foundUser.data.roles,
    });

    console.log(5);
    const resData = new ResData<UserCEntity>(
      HttpStatus.OK,
      'success',
      foundUser.data,
      {
        token,
      },
    );

    console.log(6);
    return resData;
  }
  async register(dto: CreateAuthDto): Promise<ResData<UserCEntity>> {
    const { meta } = await this.userCService.getByLogin(dto.login);

    if (meta.statusCode !== 404) {
      throw new HttpException(
        'User with this phone number already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const resData = await this.userCService.create(dto);
    return resData;
  }
}
