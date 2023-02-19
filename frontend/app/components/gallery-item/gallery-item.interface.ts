import { IGalleryItemData } from '@/shared/types/base.types'
import { GalleryItemType } from '@/shared/types/movie.types'

export interface IGalleryItem {
	data: IGalleryItemData
	width: number
	itemType: GalleryItemType
	variant?: 'vertical' | 'horizontal'
}
