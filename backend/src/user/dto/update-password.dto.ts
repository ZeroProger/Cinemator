import { IsString, MaxLength, MinLength } from 'class-validator'

export class UpdatePasswordDto {
	@MinLength(6)
	@MaxLength(24)
	password: string
}
