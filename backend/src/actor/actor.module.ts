import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MovieModel } from 'src/movie/movie.entity'
import { ActorController } from './actor.controller'
import { ActorModel } from './actor.entity'
import { ActorService } from './actor.service'

@Module({
	controllers: [ActorController],
	imports: [TypeOrmModule.forFeature([ActorModel, MovieModel])],
	providers: [ActorService],
})
export class ActorModule {}
