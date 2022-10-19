import { Body, Controller, Post, Res, Delete, Req, Get } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Role } from './entities/role.enum';
import { Roles } from './entities/roles.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @Roles(Role.Admin)
  async create(@Res() res, @Body() userDto: UserDto) {
    res.status(201).json({
      message: 'Successfully Added Employee',
      result: await this.userService.create(userDto),
    });
  }
  @Post('login')
  async loginUser(@Res() res, @Body() userDto: UserDto) {
    res.status(200).json({
      message: 'Logined Succesfully',
      JWT: await this.userService.loginUser(userDto, res),
    });
  }
  @Delete('logout')
  public async logout(@Res() res) {
    return this.userService.logout(res);
  }
  @Get('employee')
  // @Roles(Role.Admin)
  async getemployee(@Req() req, @Res() res) {
    res.status(200).json({
      message: 'Employee Details',
      result: await this.userService.getemployee(req),
    });
  }
}
