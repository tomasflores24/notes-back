import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { swaggerText } from 'src/common/swagger.text';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ ...swaggerText.auth.login })
  @Post('login')
  async login(@Body() { email, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(email, password);

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate);
    return jwt;
  }
}
