import { IsString } from 'class-validator'

export class UpdateGenreDto {
	@IsString()
	name: string

	@IsString()
	slug: string

	@IsString()
	description: string

	@IsString()
	icon: string
}
