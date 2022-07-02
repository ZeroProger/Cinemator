import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActorModel } from 'src/actor/actor.entity'
import { GenreModel } from 'src/genre/genre.entity'
import { MovieController } from './movie.controller'
import { MovieModel } from './movie.entity'
import { MovieService } from './movie.service'

@Module({
	controllers: [MovieController],
	imports: [TypeOrmModule.forFeature([MovieModel, GenreModel, ActorModel])],
	providers: [MovieService],
	exports: [MovieService],
})
export class MovieModule {}
