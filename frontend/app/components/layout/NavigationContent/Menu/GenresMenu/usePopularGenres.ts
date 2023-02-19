import { useQuery } from 'react-query'

import { IMenuItem } from '@/components/layout/NavigationContent/Menu/menu.interface'

import { GenreService } from '@/services/genre.service'

import { getGenreUrl } from '@/config/url.config'

export const usePopularGenres = () => {
	const queryData = useQuery('popular genre menu', () => GenreService.getPopularGenres(), {
		select: ({ data }) => {
			return data.map((genre) => {
				return {
					id: genre.id,
					title: genre.name,
					icon: genre.icon,
					link: getGenreUrl(genre.slug),
				} as IMenuItem
			})
		},
	})

	return queryData
}
