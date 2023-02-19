import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovieModel } from 'src/movie/movie.entity'
import { ILike, Repository } from 'typeorm'
import { ActorModel } from './actor.entity'
import { UpdateActorDto } from './dto/update-actor.dto'

@Injectable()
export class ActorService {
	constructor(
		@InjectRepository(ActorModel)
		private readonly ActorRepository: Repository<ActorModel>,
		@InjectRepository(MovieModel)
		private readonly MovieRepository: Repository<MovieModel>
	) {}

	async bySlug(slug: string) {
		const actor = await this.ActorRepository.findOne({
			where: { slug: slug },
			relations: ['movies'],
		})

		if (!actor) throw new NotFoundException('Актер не найден')

		return actor
	}

	//Aggregation переделать
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
				],
			}
		}

		options = Object.assign({}, basicOptions, whereOptions)

		const actors = await this.ActorRepository.createQueryBuilder('actors')
			.setFindOptions(options)
			.loadRelationCountAndMap('actors.movies', 'actors.movies', 'movie')
			.getMany()

		return actors
	}

	async getCount() {
		return await this.ActorRepository.count()
	}

	/* Admin */

	async byId(id: string) {
		const actor = await this.ActorRepository.findOne({
			where: { id: Number(id) },
		})

		if (!actor) throw new NotFoundException('Актер не найден')

		return actor
	}

	async create() {
		const defaultValue: UpdateActorDto = {
			name: '',
			slug: '',
			photo: '',
		}
		const actor = await this.ActorRepository.save(defaultValue)
		return actor.id
	}

	async update(id: string, dto: UpdateActorDto) {
		const actor = await this.ActorRepository.update(id, dto)

		if (actor.affected === 0) throw new NotFoundException('Актер не найден')

		return actor
	}

	async delete(id: string) {
		const actor = await this.ActorRepository.delete(id)

		if (actor.affected === 0) throw new NotFoundException('Актер не найден')

		return actor
	}
}
