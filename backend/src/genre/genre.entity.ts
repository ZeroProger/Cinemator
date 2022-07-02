import { BaseModel } from 'src/entities/base.entity'
import { MovieModel } from 'src/movie/movie.entity'
import { Column, Entity, ManyToMany } from 'typeorm'

@Entity({ name: 'genres' })
export class GenreModel extends BaseModel {
	@Column({ unique: true })
	name: string

	@Column({ unique: true })
	slug: string

	@Column()
	description: string

	@Column()
	icon: string

	@ManyToMany(() => MovieModel, (movie: MovieModel) => movie.genres, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	movies?: MovieModel[]
}
