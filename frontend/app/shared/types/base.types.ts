export interface IBasicDB {
	id: number
	createdAt: Date
	updatedAt: Date
}

export interface IGalleryItemData {
	id: number
	title: string
	slug: string
	image: string
}
