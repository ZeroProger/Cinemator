import { ActorModel } from 'src/actor/actor.entity'
import { BaseModel } from 'src/entities/base.entity'
import { GenreModel } from 'src/genre/genre.entity'
import { ReviewModel } from 'src/review/review.entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'

@Entity({ name: 'movies' })
export class MovieModel extends BaseModel {
	@Column({ unique: true })
	kinopoiskId: number

	@Column()
	poster: string

	@Column()
	bigPoster: string

	@Column()
	title: string

	@Column()
	titleOriginal: string

	@Column()
	description: string

	@Column({ unique: true })
	slug: string

	@ManyToMany(() => GenreModel, (genre: GenreModel) => genre.movies)
	@JoinTable()
	genres: GenreModel[]

	@ManyToMany(() => ActorModel, (actor: ActorModel) => actor.movies)
	@JoinTable()
	actors: ActorModel[]

	@OneToMany(() => ReviewModel, (review) => review.movie)
	reviews: ReviewModel[]

	@Column()
	year: number

	@Column()
	duration: number

	@Column({ type: 'json', default: {} })
	country: JSON

	@Column({ type: 'float', default: 0.0 })
	rating: number

	@Column({ default: 0 })
	countOpened?: number

	@Column({ default: 'age0' })
	ratingAgeLimit?: string

	@Column({ default: 'G' })
	ratingMpaa?: string

	@Column({ default: false })
	isSerial?: boolean

	@Column({ default: false })
	isSendTelegram?: boolean
}
