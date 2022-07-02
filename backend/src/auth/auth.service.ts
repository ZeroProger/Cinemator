import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { AuthDto } from './dto/auth.dto'
import { hash, genSalt, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserModel)
		private UserRepository: Repository<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		const tokens = await this.createTokenPair(String(user.id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.UserRepository.findOne({
			where: {
				email: dto.email,
			},
		})

		if (oldUser)
			throw new BadRequestException('Пользователь с этим email уже существует')

		const salt = await genSalt(10)
		const newUser = await this.UserRepository.save({
			email: dto.email,
			password: await hash(dto.password, salt),
		})
		const tokens = await this.createTokenPair(String(newUser.id))

		return {
			user: this.returnUserFields(newUser),
			...tokens,
		}
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) throw new UnauthorizedException('Вы не вошли в систему')

		const result = await this.jwtService.verifyAsync(refreshToken)

		if (!result)
			throw new UnauthorizedException('Токен истёк или введен неверно')

		const user = await this.UserRepository.findOneBy({
			id: result.id,
		})
		const tokens = await this.createTokenPair(String(user.id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async validateUser(dto: AuthDto): Promise<UserModel> {
		const user = await this.UserRepository.findOne({
			where: {
				email: dto.email,
			},
		})

		if (!user) throw new UnauthorizedException('Пользователь не найден')

		const isValidPassword = await compare(dto.password, user.password)

		if (!isValidPassword) throw new UnauthorizedException('Неверный пароль')

		return user
	}

	async createTokenPair(userId: string) {
		const data = { id: userId }
		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '30d',
		})
		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h',
		})

		return { refreshToken, accessToken }
	}

	returnUserFields(user: UserModel) {
		return {
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	}
}
