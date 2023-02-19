import { FC } from 'react'

import { usePopularGenres } from '@/components/layout/NavigationContent/Menu/GenresMenu/usePopularGenres'
import Menu from '@/components/layout/NavigationContent/Menu/Menu'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

const GenresMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()

	return isLoading ? (
		<div className="px-layout">
			<SkeletonLoader count={5} className="h-7 mt-5" />
		</div>
	) : (
		<Menu menu={{ title: 'Популярные жанры', items: data || [] }} />
	)
}

export default GenresMenu
