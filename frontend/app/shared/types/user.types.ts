import { IBasicDB } from './base.types'
import { IMovie } from './movie.types'

export interface IUser extends IBasicDB {
	email: string
	userName: string
	password: string
	isAdmin: boolean
	avatarUrl: string
	favorites?: IMovie[]
}
