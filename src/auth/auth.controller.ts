import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {

constructor(private userService: UserService) {}


@Post('signup')
signup(@Body() body:any){

return this.userService.createUser(body);

}


@Post('login')
async login(@Body() body:any){

const user = await this.userService.findByEmail(body.email);

if(!user){

return { success:false, message:"Email not found" };

}

const valid = await bcrypt.compare(body.password, user.password);

if(!valid){

return { success:false, message:"Wrong password" };

}

return { success:true, message:"Login successful" };

}

}