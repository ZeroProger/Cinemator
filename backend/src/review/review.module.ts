import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MovieModule } from 'src/movie/movie.module'
import { UserModule } from 'src/user/user.module'
import { ReviewController } from './review.controller'
import { ReviewModel } from './review.entity'
import { ReviewService } from './review.service'

@Module({
	controllers: [ReviewController],
	imports: [TypeOrmModule.forFeature([ReviewModel]), MovieModule, UserModule],
	providers: [ReviewService],
})
export class ReviewModule {}
