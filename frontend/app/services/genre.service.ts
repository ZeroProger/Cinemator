import { ICollectionGenre, ISimpleGenre } from '@/shared/types/movie.types'

import { axiosClassic } from '../api/interceptors'

import { getGenresUrl } from './../config/api.config'
import { IGenre } from './../shared/types/movie.types'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		})
	},

	async getPopularGenres(limit = 4) {
		return axiosClassic.get<ISimpleGenre[]>(getGenresUrl('/most-popular'), { params: { limit } })
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},

	async getCollections() {
		return axiosClassic.get<ICollectionGenre[]>(getGenresUrl('/collections'))
	},
}
