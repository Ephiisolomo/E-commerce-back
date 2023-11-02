import { Controller, Request, Get, Post, Body, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user-dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.dcorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guards/roles.guard';
import { User } from '../user/schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
//@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
   const user = await this.userService.addUser(createUserDTO);
    
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    //const userinfo = await this.authService.validateUser(req.username, req.password);
    return this.authService.login(req.user);
  }

  @Post('/logout')
  async logout(@Request() req){
    await this.authService.logout(req.user);

    return{message:"Logged out successfully "}
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @Roles(Role.Admin)
  @Get('/users')
  getusers(@Request() req): any {
    const users = this.userService.all()
    return users;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }
}