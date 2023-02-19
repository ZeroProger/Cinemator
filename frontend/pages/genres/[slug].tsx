import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/catalog/Catalog'

import { IGalleryItemData } from '@/shared/types/base.types'
import { GalleryItemType } from '@/shared/types/movie.types'

import { GenreService } from '@/services/genre.service'

interface IGenrePage {
	catalogData: IGalleryItemData[]
	genreTitle: string
	genreDescription: string
}

const GenrePage: NextPage<IGenrePage> = ({ catalogData, genreTitle, genreDescription }) => {
	return (
		<Catalog
			title={genreTitle}
			description={genreDescription}
			data={catalogData || []}
			itemType={GalleryItemType.Movie}
		/>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await GenreService.bySlug(String(params?.slug))
		const formatedData = genre?.movies?.map((movie) => {
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
				genreTitle: genre.name,
				genreDescription: genre.description,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			notFound: true,
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAll()

		const paths = genres.map((genre) => ({
			params: {
				slug: genre.slug,
			},
		}))

		return {
			paths: paths,
			fallback: 'blocking',
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export default GenrePage
