import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MovieModule } from 'src/movie/movie.module'
import { GenreController } from './genre.controller'
import { GenreModel } from './genre.entity'
import { GenreService } from './genre.service'

@Module({
	controllers: [GenreController],
	imports: [TypeOrmModule.forFeature([GenreModel]), MovieModule],
	providers: [GenreService],
})
export class GenreModule {}
