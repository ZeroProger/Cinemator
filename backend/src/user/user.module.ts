import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MovieModel } from 'src/movie/movie.entity'
import { UserController } from './user.controller'
import { UserModel } from './user.entity'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	imports: [TypeOrmModule.forFeature([UserModel, MovieModel]), ConfigModule],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
