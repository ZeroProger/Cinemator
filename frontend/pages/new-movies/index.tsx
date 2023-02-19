import type { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/catalog/Catalog'

import { IGalleryItemData } from '@/shared/types/base.types'
import { GalleryItemType } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

const NewMoviesPage: NextPage<{ catalogData: IGalleryItemData[] }> = ({ catalogData }) => {
	return (
		<Catalog
			title="Новинки"
			description="Здесь собраны все самые свежие фильмы, как только они появляются в хорошем качестве мы сразу же загружаем их для вас!"
			data={catalogData || []}
			itemType={GalleryItemType.Movie}
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await MovieService.getAll('', 1, 20, 'year', 'DESC')
		const formatedData = data.data.map((movie) => {
			return {
				id: movie.id,
				title: movie.title,
				image: movie.poster,
				slug: movie.slug,
			} as IGalleryItemData
		})

		return {
			props: {
				catalogData: formatedData,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export default NewMoviesPage
