import { IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateUserNameDto {
	@MinLength(2)
	@MaxLength(16)
	@IsString()
	userName: string
}
