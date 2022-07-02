import { IsNumber, IsPositive, IsString } from 'class-validator'

export class SetReviewDto {
	@IsString()
	text: string

	@IsPositive()
	mark: number

	@IsNumber()
	movieId: number
}
