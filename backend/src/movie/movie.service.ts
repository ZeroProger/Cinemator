import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ActorModel } from 'src/actor/actor.entity'
import { GenreModel } from 'src/genre/genre.entity'
import { ILike, In, MoreThan, Repository } from 'typeorm'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { MovieModel } from './movie.entity'

@Injectable()
export class MovieService {
	constructor(
		@InjectRepository(MovieModel)
		private readonly MovieRepository: Repository<MovieModel>,
		@InjectRepository(GenreModel)
		private readonly GenreRepository: Repository<GenreModel>,
		@InjectRepository(ActorModel)
		private readonly ActorRepository: Repository<ActorModel>
	) {}

	async getAll(searchTerm?: string) {
		let options = {}
		let whereOptions = {}
		const basicOptions = {
			order: {
				id: 'ASC',
			},
			relations: ['actors', 'genres'],
		}

		if (searchTerm) {
			whereOptions = {
				where: [
					{ title: ILike(`%${searchTerm}%`) },
					{ titleOriginal: ILike(`%${searchTerm}%`) },
				],
			}
		}

		options = Object.assign({}, basicOptions, whereOptions)

		return await this.MovieRepository.find(options)
	}

	async getCount() {
		return await this.MovieRepository.count()
	}

	async getMostViewed() {
		return await this.MovieRepository.find({
			where: { countOpened: MoreThan(0) },
			order: {
				countOpened: 'DESC',
			},
		})
	}

	async bySlug(slug: string) {
		// const movie = await this.MovieRepository.findOne({
		// 	where: { slug: slug },
		// 	relations: ['actors', 'genres', 'reviews', 'reviews.user'],
		// 	select: {
		// 		reviews: {
		// 			user: {
		// 				id: true,
		// 			},
		// 		},
		// 	},
		// })

		const movie = await this.MovieRepository.createQueryBuilder('movies')
			.where('movies.slug = :slug', { slug: slug })
			.leftJoin('movies.actors', 'actors')
			.leftJoin('movies.genres', 'genres')
			.leftJoin('movies.reviews', 'reviews')
			.leftJoin('reviews.user', 'user')
			.addSelect(['actors', 'genres', 'reviews', 'user.id', 'user.email'])
			.getOne()

		if (!movie) throw new NotFoundException('Фильм не найден')

		return movie
	}

	async byActors(actorIds: number[]) {
		const movies = await this.MovieRepository.find({
			relations: {
				actors: true,
				genres: true,
			},
			where: {
				actors: {
					id: In(actorIds),
				},
			},
		})

		if (!movies) throw new NotFoundException('Фильмы не найдены')

		const movieIds = movies.map((movie) => movie.id)

		const filteredMovies = await this.MovieRepository.find({
			relations: {
				actors: true,
				genres: true,
			},
			where: {
				id: In(movieIds),
			},
		})

		if (!filteredMovies) throw new NotFoundException('Фильмы не найдены')

		return filteredMovies
	}

	async byGenres(genreIds: number[]) {
		const movies = await this.MovieRepository.find({
			relations: ['actors', 'genres'],
			where: {
				genres: {
					id: In(genreIds),
				},
			},
		})

		if (!movies) throw new NotFoundException('Фильмы не найдены')

		const movieIds = movies.map((movie) => movie.id)

		const filteredMovies = await this.MovieRepository.find({
			relations: {
				actors: true,
				genres: true,
			},
			where: {
				id: In(movieIds),
			},
		})

		if (!filteredMovies) throw new NotFoundException('Фильмы не найдены')

		return filteredMovies
	}

	/* Admin */

	async byId(id: number) {
		const movie = await this.MovieRepository.findOne({
			relations: ['actors', 'genres', 'reviews', 'reviews.user'],
			where: { id: id },
		})

		if (!movie) throw new NotFoundException('Фильм не найден')

		return movie
	}

	async create() {
		const defaultValue: UpdateMovieDto = {
			kinopoiskId: -1,
			poster: '',
			bigPoster: '',
			title: '',
			titleOriginal: '',
			description: '',
			slug: '',
			rating: 0,
			genres: [],
			actors: [],
			year: 0,
			duration: 0,
			country: JSON,
		}

		const movie = await this.MovieRepository.save(defaultValue)

		return movie.id
	}

	async update(id: string, dto: UpdateMovieDto) {
		const movie = await this.MovieRepository.findOneBy({ id: Number(id) })

		if (!movie) throw new NotFoundException('Фильм не найден')

		const genres = dto.genres
			? await await this.GenreRepository.find({
					where: {
						id: In(dto.genres),
					},
			  })
			: []
		const actors = dto.actors
			? await await this.ActorRepository.find({
					where: {
						id: In(dto.actors),
					},
			  })
			: []

		for (const field in dto) {
			movie[field] = dto[field]
		}

		movie.actors = actors
		movie.genres = genres

		return await this.MovieRepository.save(movie)
	}

	async updateCountOpened(slug: string) {
		const movie = await this.MovieRepository.findOneBy({ slug: slug })

		if (!movie) throw new NotFoundException('Фильм не найден')

		const movieUpd = await this.MovieRepository.update(
			{ slug: slug },
			{
				countOpened: movie.countOpened + 1,
			}
		)

		return movie
	}

	async updateRating(movieId: number, newRating: number) {
		return await this.MovieRepository.update(movieId, {
			rating: newRating,
		})
	}

	async delete(id: string) {
		const movie = await this.MovieRepository.delete(id)

		if (movie.affected === 0) throw new NotFoundException('Фильм не найден')

		return movie
	}
}
