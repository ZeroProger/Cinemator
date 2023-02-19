import type { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/catalog/Catalog'

import { IGalleryItemData } from '@/shared/types/base.types'
import { GalleryItemType } from '@/shared/types/movie.types'

import { GenreService } from '@/services/genre.service'

const GenresPage: NextPage<{ catalogData: IGalleryItemData[] }> = ({ catalogData }) => {
	return (
		<Catalog
			title="Жанры"
			description="На нашем сайте собрано множество разнообразных жанров фильмов и сериалов - окунитесь в мир кинематографа прямо сейчас!"
			data={catalogData || []}
			itemWidth={340}
			itemType={GalleryItemType.Genre}
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await GenreService.getCollections()
		const formatedData = data?.map((genre) => {
			return {
				id: genre.id,
				title: genre.title,
				image: genre.image,
				slug: genre.slug,
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

export default GenresPage
