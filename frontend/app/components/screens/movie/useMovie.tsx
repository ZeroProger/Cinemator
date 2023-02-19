import { useQuery } from 'react-query'

import { MovieService } from '@/services/movie.service'

export const useMovie = (slug: string) => {
	const queryData = useQuery(['get movie by slug', slug], () => MovieService.bySlug(slug), {
		select: ({ data }) => data,
	})

	return queryData
}
