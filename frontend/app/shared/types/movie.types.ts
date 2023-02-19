import { IBasicDB } from './base.types'
import { IUser } from './user.types'

export enum GalleryItemType {
	Actor,
	Genre,
	Movie,
}

export interface ISimpleGenre {
	id: number
	name: string
	slug: string
	icon: string
}

export interface ICollectionGenre {
	id: number
	image: string
	title: string
	slug: string
}

export interface IGenre extends IBasicDB {
	name: string
	slug: string
	description: string
	icon: string
	movies?: IMovie[]
}

export interface IActor extends IBasicDB {
	name: string
	slug: string
	photo: string
	movies?: IMovie[]
}

export interface IReview extends IBasicDB {
	text: string
	mark: number
	user: IUser
}

export interface ICountry {
	name: string
}

export interface IMovie extends IBasicDB {
	kinopoiskId: number
	poster: string
	bigPoster: string
	title: string
	titleOriginal: string
	description: string
	slug: string
	genres: IGenre[]
	actors: IActor[]
	reviews: IReview[]
	year: number
	duration: number
	country: ICountry
	rating: number
	countOpened?: number
	ratingAgeLimit?: string
	ratingMpaa?: string
	isSerial?: boolean
	isSendTelegram?: boolean
}

export interface IPlayer {
	source: string
	translation: string
	quality: string
	iframeUrl: string
}
