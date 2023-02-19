import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovieService } from 'src/movie/movie.service'
import { ILike, Repository } from 'typeorm'
import { UpdateGenreDto } from './dto/create-genre.dto'
import { GenreModel } from './genre.entity'
import { ICollection } from './genre.interface'

@Injectable()
export class GenreService {
	constructor(
		@InjectRepository(GenreModel)
		private readonly GenreRepository: Repository<GenreModel>,
		private readonly movieService: MovieService
	) {}

	async bySlug(slug: string) {
		const genre = await this.GenreRepository.findOne({
			where: { slug: slug },
			relations: ['movies'],
		})

		if (!genre) throw new NotFoundException('Жанр не найден')

		return genre
	}

	async getAll(searchTerm?: string) {
		let options = {}
		let whereOptions = {}
		const basicOptions = {
			order: {
				id: 'ASC',
			},
		}

		if (searchTerm) {
			whereOptions = {
				where: [
					{ name: ILike(`%${searchTerm}%`) },
					{ slug: ILike(`%${searchTerm}%`) },
					{ description: ILike(`%${searchTerm}%`) },
				],
			}
		}

		options = Object.assign({}, basicOptions, whereOptions)

		return await this.GenreRepository.find(options)
	}

	async getCount() {
		return await this.GenreRepository.count()
	}

	async getCollections() {
		const genres = await this.getAll()
		const collections = await Promise.all(
			genres.map(async (genre) => {
				const movies = await this.movieService.byGenres([genre.id])
				const result: ICollection = {
					id: genre.id,
					image: movies[0]?.bigPoster || movies[0]?.poster,
					title: genre.name,
					slug: genre.slug,
				}

				return result
			})
		)

		return collections
	}

	async getMostPopularGenres() {
		const mostViewedMovies = await this.movieService.getMostViewed()
		const genreArrays = await mostViewedMovies.map((movie) => movie.genres)
		let genres: GenreModel[] = []

		genreArrays.forEach((genreArray) => {
			genreArray.forEach((genre) => {
				genres.push(genre)
			})
		})

		const uniqueGenres = this.unique(
			Array.from(new Set<GenreModel>(genres)),
			'id'
		)

		return uniqueGenres.slice(0, 4)
	}

	unique(array, propertyName): Array<GenreModel> {
		return array.filter(
			(e, i) =>
				array.findIndex((a) => a[propertyName] === e[propertyName]) === i
		)
	}

	/* Admin */

	async byId(id: string) {
		const genre = await this.GenreRepository.findOne({
			where: { id: Number(id) },
		})

		if (!genre) throw new NotFoundException('Жанр не найден')

		return genre
	}

	async create() {
		const defaultValue: UpdateGenreDto = {
			name: '',
			slug: '',
			description: '',
			icon: '',
		}
		const genre = await this.GenreRepository.save(defaultValue)
		return genre.id
	}

	async update(id: string, dto: UpdateGenreDto) {
		const genre = await this.GenreRepository.update(id, dto)

		if (genre.affected === 0) throw new NotFoundException('Жанр не найден')

		return genre
	}

	async delete(id: string) {
		const genre = await this.GenreRepository.delete(id)

		if (genre.affected === 0) throw new NotFoundException('Жанр не найден')

		return genre
	}
}
