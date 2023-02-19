import {
	BadGatewayException,
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { genSalt, hash } from 'bcryptjs'
import { MovieModel } from 'src/movie/movie.entity'
import { ILike, Repository } from 'typeorm'
import { UpdateEmailDto } from './dto/update-email.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto'
import { UpdateUserNameDto } from './dto/update-username.dto'
import { UserModel } from './user.entity'
import { UpdateAvatarDto } from "./dto/update-avatar-dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserModel)
		private UserRepository: Repository<UserModel>,
		@InjectRepository(MovieModel)
		private MovieRepository: Repository<MovieModel>
	) {}

	async byId(id: number) {
		const user = await this.UserRepository.findOne({
			relations: ['favorites'],
			where: { id: id },
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}

	isUpdatePassword(dto: any) {
		return dto.password != null && dto.password != undefined
	}

	async updateProfile(
		id: number,
		dto: UpdateEmailDto | UpdatePasswordDto | UpdateUserNameDto
	) {
		const user = await this.byId(id)

		if (!user) throw new NotFoundException('Пользователь с данным id не найден')

		if (this.isUpdatePassword(dto)) {
			const salt = await genSalt(10)
			user.password = await hash((<UpdatePasswordDto>dto).password, salt)

			await this.UserRepository.save(user)
			return
		}

		await this.UserRepository.update(id, dto)
		return
	}

	async updateAvatar(
		id: number,
		dto: UpdateAvatarDto
	) {
		const user = await this.byId(id)

		if (!user) throw new NotFoundException('Пользователь с данным id не найден')

		await this.UserRepository.update(id, dto)
		return
	}

	async updateUser(id: number, dto: UpdateUserByAdminDto) {
		const user = await this.byId(id)

		if (!user) throw new NotFoundException('Пользователь с данным id не найден')

		if (dto.email) {
			const sameUser = await this.UserRepository.findOne({
				where: { email: dto.email },
			})

			if (sameUser && id !== sameUser.id)
				throw new NotFoundException('Данный email занят')

			if (
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					dto.email
				) == false
			)
				throw new BadRequestException('Неверный формат email')
			user.email = dto.email
		}

		if (dto.userName) {
			if (typeof dto.userName !== 'string')
				throw new BadRequestException('userName должен быть строкой')
			if (dto.userName.length > 16 || dto.userName.length < 2)
				throw new BadRequestException(
					'userName должен быть длиной от 2 до 16 символов'
				)
			user.userName = dto.userName
		}

		if (dto.password) {
			if (dto.password.length > 20 || dto.password.length < 4)
				throw new BadRequestException(
					'password должен быть длиной от 4 до 20 символов'
				)
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		if (dto.isAdmin) {
			user.isAdmin = dto.isAdmin
		}

		if (dto.avatarUrl) {
			user.avatarUrl = dto.avatarUrl
		}

		return await this.UserRepository.save(user)
	}

	async getCount() {
		return await this.UserRepository.count()
	}

	async getAll(searchTerm?: string) {
		let options = {}
		let whereOptions = {}
		const basicOptions = {
			relations: {
				favorites: true,
			},
			select: {
				id: true,
				email: true,
				userName: true,
				isAdmin: true,
				avatarUrl: true,
				createdAt: true,
			},
			order: {
				id: 'ASC',
			},
		}

		if (searchTerm) {
			whereOptions = {
				where: [
					{email: ILike(`%${String(searchTerm)}%`)},
					{userName: ILike(`%${String(searchTerm)}%`)},
				],
			}
		}

		options = Object.assign({}, basicOptions, whereOptions)

		return await this.UserRepository.find(options)
	}

	async delete(id: number) {
		return await this.UserRepository.delete({ id: id })
	}

	async toggleFavorites(movieId: number, userId: number) {
		const movie = await this.MovieRepository.findOneBy({ id: movieId })

		if (!movie) throw new NotFoundException('Фильм не найден')

		const user = await this.UserRepository.findOne({
			where: {
				id: userId,
			},
			relations: {
				favorites: true,
			},
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		let favorites = user.favorites || []

		favorites = favorites.map((movie) => movie.id).includes(movieId)
			? favorites.filter((movie) => movie.id != movieId)
			: [...favorites, movie]

		user.favorites = favorites
		await this.UserRepository.save(user)
	}

	async getFavorites(userId: number) {
		const user = await this.UserRepository.findOne({
			relations: ['favorites'],
			where: { id: userId },
		})

		return user.favorites
	}
}
