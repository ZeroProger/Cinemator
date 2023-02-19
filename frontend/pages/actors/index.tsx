import type { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/catalog/Catalog'

import { IGalleryItemData } from '@/shared/types/base.types'
import { GalleryItemType } from '@/shared/types/movie.types'

import { ActorService } from '@/services/actor.service'

const ActorsPage: NextPage<{ catalogData: IGalleryItemData[] }> = ({ catalogData }) => {
	return (
		<Catalog
			title="Актеры"
			description="На данной странице вы можете найти своих любимых актеров и узнать о них подробнее"
			data={catalogData || []}
			itemType={GalleryItemType.Actor}
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: actors } = await ActorService.getAll('')
		const formatedData = actors?.map((actor) => {
			return {
				id: actor.id,
				title: actor.name,
				image: actor.photo,
				slug: actor.slug,
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

export default ActorsPage
