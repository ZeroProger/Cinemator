import { BaseModel } from 'src/entities/base.entity'
import { MovieModel } from 'src/movie/movie.entity'
import { Column, Entity, ManyToMany } from 'typeorm'

@Entity({ name: 'actors' })
export class ActorModel extends BaseModel {
	@Column()
	name: string

	@Column({ unique: true })
	slug: string

	@Column()
	photo: string

	@ManyToMany(() => MovieModel, (movie: MovieModel) => movie.actors, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	movies?: MovieModel[]
}
