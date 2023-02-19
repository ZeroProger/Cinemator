import cn from 'classnames'
import { FC } from 'react'

import { GalleryItemType } from '@/shared/types/movie.types'

import Meta from '@/utils/meta/Meta'

import GalleryItem from '../gallery-item/GalleryItem'
import Heading from '../ui/heading/Heading'
import SubHeading from '../ui/heading/SubHeading'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'

const Catalog: FC<ICatalog> = ({ title, description, data, itemWidth = 180, itemType }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && <SubHeading text={description} className={styles.description} />}
			<section
				className={cn(
					{ [styles.movies]: itemType !== GalleryItemType.Genre },
					{ [styles.genres]: itemType === GalleryItemType.Genre }
				)}
			>
				{data.map((item) => (
					<GalleryItem
						key={item.id}
						data={item}
						width={itemWidth}
						variant={itemType === GalleryItemType.Genre ? 'horizontal' : 'vertical'}
						itemType={itemType}
					/>
				))}
			</section>
		</Meta>
	)
}

export default Catalog
