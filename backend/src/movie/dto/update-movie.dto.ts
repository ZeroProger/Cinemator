import { IsJSON, IsNumber, IsString } from 'class-validator'

export class UpdateMovieDto {
	@IsNumber()
	kinopoiskId: number

	@IsString()
	poster: string

	@IsString()
	bigPoster: string

	@IsString()
	title: string

	@IsString()
	titleOriginal: string

	@IsString()
	description: string

	@IsString()
	slug: string

	@IsNumber()
	rating: number

	genres?: []

	actors?: []

	@IsNumber()
	year: number

	@IsNumber()
	duration: number

	@IsJSON()
	country: JSON

	ratingAgeLimit?: string

	ratingMpaa?: string

	isSerial?: boolean

	isSendTelegram?: boolean
}
