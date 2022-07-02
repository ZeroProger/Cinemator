import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from 'src/user/decorators/user.decorator'
import { UserModel } from 'src/user/user.entity'
import { SetReviewDto } from './dto/set-review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get(':movieId')
	@Auth()
	async getMovieReviewByUser(
		@Param('movieId', IdValidationPipe) movieId: number,
		@User('id') id: number
	) {
		return this.reviewService.getMovieReviewByUser(movieId, id)
	}

	@Post('set-review')
	@HttpCode(200)
	@Auth()
	async setReview(@User('id') userId: number, @Body() dto: SetReviewDto) {
		return this.reviewService.setReview(userId, dto)
	}
}
