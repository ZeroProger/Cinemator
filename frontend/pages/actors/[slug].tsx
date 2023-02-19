import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/catalog/Catalog'

import { IGalleryItemData } from '@/shared/types/base.types'
import { GalleryItemType } from '@/shared/types/movie.types'

import { ActorService } from '@/services/actor.service'

interface IActorPage {
	catalogData: IGalleryItemData[]
	actorName: string
}

const ActorPage: NextPage<IActorPage> = ({ catalogData, actorName }) => {
	return (
		<Catalog
			title={actorName}
			description={`На данной странице вы можете найти всю информацию об актере ${actorName} и посмотреть фильмы с его участием`}
			data={catalogData || []}
			itemType={GalleryItemType.Movie}
		/>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await ActorService.bySlug(String(params?.slug))
		const formatedData = actor?.movies?.map((movie) => {
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
				actorName: actor.name,
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
		const { data: actors } = await ActorService.getAll()

		const paths = actors.map((actor) => ({
			params: {
				slug: actor.slug,
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

export default ActorPage
