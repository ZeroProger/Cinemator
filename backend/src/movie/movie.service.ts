import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ActorModel } from 'src/actor/actor.entity'
import { GenreModel } from 'src/genre/genre.entity'
import { ILike, In, Repository } from 'typeorm'
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

	async getAll(
		searchTerm?: string,
		page: number = 1,
		take: number = 1,
		sortProperty: string = 'id',
		sortType: string = 'ASC'
	) {
		const skip = (page - 1) * take

		let options = {}
		let whereOptions = {}
		let orderOptions = {
			[sortProperty]: sortType,
		}

		const basicOptions = {
			order: orderOptions,
			relations: ['actors', 'genres'],
			skip: skip,
			take: take,
		}

		if (searchTerm) {
			whereOptions = {
				where: [
					{
						title:
							searchTerm.length > 1
								? ILike(`%${searchTerm}%`)
								: ILike(`${searchTerm}%`),
					},
					{
						titleOriginal:
							searchTerm.length > 1
								? ILike(`%${searchTerm}%`)
								: ILike(`${searchTerm}%`),
					},
				],
			}
		}

		options = Object.assign({}, basicOptions, whereOptions)

		const [result, total] = await this.MovieRepository.findAndCount(options)
		return { data: result, totalCount: total }
	}

	async getCount() {
		return await this.MovieRepository.count()
	}

	async getMostViewed() {
		return await this.MovieRepository.find({
			relations: ['genres'],
			order: {
				countOpened: 'DESC',
			},
		})
	}

	async bySlug(slug: string) {
		const movie = await this.MovieRepository.createQueryBuilder('movies')
			.where('movies.slug = :slug', { slug: slug })
			.leftJoin('movies.actors', 'actors')
			.leftJoin('movies.genres', 'genres')
			.leftJoin('movies.reviews', 'reviews')
			.leftJoin('reviews.user', 'user')
			.addSelect([
				'actors',
				'genres',
				'reviews',
				'user.id',
				'user.email',
				'user.avatarUrl',
				'user.userName',
			])
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
			order: {
				actors: {
					id: 'ASC',
				},
				genres: {
					id: 'ASC',
				},
			},
		})

		if (!movies) throw new NotFoundException('Фильмы не найдены')

		const filteredMovies = movies.filter((movie) => {
			const movieActors = movie.actors.map((actor) => actor.id)
			if (actorIds.every((actorId) => movieActors.includes(actorId)))
				return movie
		})

		if (!filteredMovies) throw new NotFoundException('Фильмы не найдены')

		return filteredMovies
	}

	async byGenres(genreIds: number[]) {
		const movies = await this.MovieRepository.find({
			relations: {
				actors: true,
				genres: true,
			},
			order: {
				countOpened: 'DESC',
				actors: {
					id: 'ASC',
				},
				genres: {
					id: 'ASC',
				},
			},
		})

		if (!movies) throw new NotFoundException('Фильмы не найдены')

		const filteredMovies = movies.filter((movie) => {
			const movieGenres = movie.genres.map((genre) => genre.id)
			if (genreIds.every((genreId) => movieGenres.includes(genreId)))
				return movie
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
			? await this.GenreRepository.find({
					where: {
						id: In(dto.genres),
					},
			  })
			: movie.genres
		const actors = dto.actors
			? await this.ActorRepository.find({
					where: {
						id: In(dto.actors),
					},
			  })
			: movie.actors

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
