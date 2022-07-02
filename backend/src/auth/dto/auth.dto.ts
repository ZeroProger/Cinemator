import { IsEmail, IsString, Min, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@IsString()
	@MinLength(6, {
		message: 'Пароль должен быть длиннее 6 символов',
	})
	password: string
}
