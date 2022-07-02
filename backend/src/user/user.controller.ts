import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { IdValidationPipe } from 'src/pipes/id.validation.pipe'
import { User } from './decorators/user.decorator'
import { UpdateEmailDto } from './dto/update-email.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto'
import { UpdateUserNameDto } from './dto/update-username.dto'
import { UserModel } from './user.entity'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@User('id') id: number) {
		return this.userService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile/change-email')
	@HttpCode(200)
	@Auth()
	async updateEmail(@User('id') id: number, @Body() dto: UpdateEmailDto) {
		return this.userService.updateProfile(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile/change-password')
	@HttpCode(200)
	@Auth()
	async updatePassword(@User('id') id: number, @Body() dto: UpdatePasswordDto) {
		return this.userService.updateProfile(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile/change-username')
	@HttpCode(200)
	@Auth()
	async updateUserName(@User('id') id: number, @Body() dto: UpdateUserNameDto) {
		return this.userService.updateProfile(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateUser(
		@Param('id', IdValidationPipe) id: number,
		@Body() dto: UpdateUserByAdminDto
	) {
		return this.userService.updateUser(id, dto)
	}

	@Get('count')
	@Auth('admin')
	async getCountUsers() {
		return this.userService.getCount()
	}

	@Get()
	@Auth('admin')
	async getAllUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	@Get(':id')
	@Auth('admin')
	async getUser(@Param('id', IdValidationPipe) id: number) {
		return this.userService.byId(id)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async deleteUser(@Param('id', IdValidationPipe) id: number) {
		return this.userService.delete(id)
	}

	@Put('profile/favorites')
	@HttpCode(200)
	@Auth()
	async toggleFavorites(
		@Body('movieId', IdValidationPipe) movieId: number,
		@User('id') userId: number
	) {
		return this.userService.toggleFavorites(movieId, userId)
	}

	@Get('profile/favorites')
	@Auth()
	async getFavorites(@User('id') id: number) {
		return this.userService.getFavorites(id)
	}
}
