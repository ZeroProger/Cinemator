import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { GalleryItemType } from '@/shared/types/movie.types'

import { getActorUrl, getGenreUrl, getMovieUrl } from '@/config/url.config'

import styles from './GalleryItem.module.scss'
import { IGalleryItem } from './gallery-item.interface'

const GalleryItem: FC<IGalleryItem> = ({ data, width, itemType, variant = 'vertical' }) => {
	const imageAlt =
		itemType === GalleryItemType.Actor
			? `Фото актера ${data.title}`
			: itemType === GalleryItemType.Genre
			? `Коллекция фильмов жанра ${data.title}`
			: `Обложка фильма ${data.title}`

	const linkHref =
		itemType === GalleryItemType.Movie
			? getMovieUrl(data.slug)
			: itemType === GalleryItemType.Genre
			? getGenreUrl(data.slug)
			: getActorUrl(data.slug)

	return (
		<Link href={linkHref} className={styles.link}>
			<Image
				src={data.image}
				alt={imageAlt}
				width={width}
				height={variant === 'vertical' ? width * 1.5 : width / 2}
				className={styles.image}
				style={{
					aspectRatio: variant === 'vertical' ? '2/3' : '2/1',
					objectFit: 'cover',
					objectPosition: 'top',
				}}
			/>
			{itemType === GalleryItemType.Movie ? (
				<div className={styles.info}>
					<Tooltip
						className={styles.tooltip}
						content={<div className="text-center text-base">{data.title}</div>}
						css={{ backgroundColor: '#4d4d4d' }}
						hideArrow
						shadow
						isDisabled={data.title.length < 14}
					>
						<span className={styles.span}>{data.title}</span>
					</Tooltip>
				</div>
			) : itemType === GalleryItemType.Genre ? (
				<div className={styles.title}>{data.title}</div>
			) : (
				<span className={styles.span}>{data.title}</span>
			)}
		</Link>
	)
}

export default GalleryItem
