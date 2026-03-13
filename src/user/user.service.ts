import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

constructor(
@InjectRepository(User)
private userRepo: Repository<User>,
){}


async createUser(data:any){

const hashedPassword = await bcrypt.hash(data.password,10);

const user = this.userRepo.create({

username:data.username,
email:data.email,
password:hashedPassword

});

return this.userRepo.save(user);

}


async findByEmail(email:string){

return this.userRepo.findOne({

where:{ email }

});

}

}