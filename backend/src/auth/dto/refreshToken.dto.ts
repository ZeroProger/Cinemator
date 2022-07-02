import { IsString } from 'class-validator'

export class RefreshTokenDto {
	@IsString({
		message: 'Отсутствует refreshToken или он не является строкой',
	})
	refreshToken: string
}
