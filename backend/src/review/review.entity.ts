import { BaseModel } from 'src/entities/base.entity'
import { MovieModel } from 'src/movie/movie.entity'
import { UserModel } from 'src/user/user.entity'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'

@Entity({ name: 'reviews' })
export class ReviewModel extends BaseModel {
	@Column()
	text: string

	@Column({ type: 'float', default: 0.0 })
	mark: number

	@ManyToOne(() => UserModel, (user) => user.reviews, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	user: UserModel

	@ManyToOne(() => MovieModel, (movie) => movie.reviews, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	movie: MovieModel
}
