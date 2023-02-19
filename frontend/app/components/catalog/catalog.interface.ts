import { IGalleryItemData } from '@/shared/types/base.types'
import { GalleryItemType } from '@/shared/types/movie.types'

export interface ICatalog {
	title: string
	description?: string
	data: IGalleryItemData[]
	itemType: GalleryItemType
	itemWidth?: number
}
