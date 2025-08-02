import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register new user' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Get('me')
  @ApiTags('Profile')
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Req() req) {
    return this.usersService.findById(req.user);
  }
}
