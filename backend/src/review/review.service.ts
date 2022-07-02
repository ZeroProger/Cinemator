import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { use } from 'passport'
import { MovieModel } from 'src/movie/movie.entity'
import { MovieService } from 'src/movie/movie.service'
import { UserModel } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { Repository } from 'typeorm'
import { SetReviewDto } from './dto/set-review.dto'
import { ReviewModel } from './review.entity'

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(ReviewModel)
		private readonly ReviewRepository: Repository<ReviewModel>,
		private readonly movieService: MovieService,
		private readonly userService: UserService
	) {}

	async getMovieReviewByUser(movieId: number, userId: number) {
		const review = await this.ReviewRepository.findOne({
			relations: ['user', 'movie'],
			where: {
				user: {
					id: userId,
				},
				movie: {
					id: movieId,
				},
			},
			select: {
				user: {
					id: true,
					email: true,
					isAdmin: true,
				},
				movie: {
					id: true,
				},
			},
		})

		if (!review)
			throw new NotFoundException(
				'Вы не оставляли отзыв либо фильм с данным id не найден'
			)

		return review
	}

	async setReview(userId: number, dto: SetReviewDto) {
		const { movieId, text, mark } = dto
		const movie = await this.movieService.byId(movieId)
		const user = await this.userService.byId(userId)

		if (!user) throw new NotFoundException('Пользователь с таким id не найден')

		if (!user.userName)
			throw new BadRequestException(
				'Вам нужно установить userName для того, чтобы оставить отзыв'
			)

		const defaultReview = {
			text: text,
			mark: mark,
			movie: movie,
			user: user,
		}

		const oldReview = await this.ReviewRepository.findOne({
			relations: ['user', 'movie'],
			where: {
				user: {
					id: userId,
				},
				movie: {
					id: movieId,
				},
			},
		})

		if (oldReview)
			throw new BadRequestException(
				'Вы уже оставили отзыв на фильм с данным id'
			)

		const review = await this.ReviewRepository.save(defaultReview)

		const movieRating = await this.getRatingByMovie(movieId)

		await this.movieService.updateRating(movieId, movieRating)

		return review
	}

	async getRatingByMovie(movieId: number) {
		const marks = await this.ReviewRepository.find({
			relations: ['movie'],
			where: {
				movie: {
					id: movieId,
				},
			},
			select: {
				mark: true,
			},
		})

		return +(
			marks.reduce((acc, item) => acc + item.mark, 0) / marks.length
		).toFixed(1)
	}
}
