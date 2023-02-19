import { getMoviesUrl } from '@/config/api.config'

import { axiosClassic } from '../api/interceptors'

import { IMovie } from './../shared/types/movie.types'

export const MovieService = {
	async getAll(
		searchTerm?: string,
		page?: number,
		take?: number,
		sortProperty?: string,
		sortType?: string
	) {
		return axiosClassic.get<{ data: IMovie[]; totalCount: number }>(getMoviesUrl(''), {
			params: { searchTerm, page, take, sortProperty, sortType },
		})
	},

	async bySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},
}
