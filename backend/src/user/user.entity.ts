import { BaseModel } from 'src/entities/base.entity'
import { MovieModel } from 'src/movie/movie.entity'
import { ReviewModel } from 'src/review/review.entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'

@Entity({ name: 'users' })
export class UserModel extends BaseModel {
	@Column({ unique: true })
	email: string

	@Column({ unique: true, nullable: true })
	userName: string

	@Column()
	password: string

	@Column({ default: false })
	isAdmin: boolean

	@ManyToMany(() => MovieModel, {
		cascade: true,
	})
	@JoinTable()
	favorites?: MovieModel[]

	@OneToMany(() => ReviewModel, (review) => review.user)
	reviews: ReviewModel[]
}
