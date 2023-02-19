import { Tooltip } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { Icon } from '@/components/ui/Icon'

import { IMovie } from '@/shared/types/movie.types'

import { getMovieUrl } from '@/config/url.config'

import styles from './SearchListItem.module.scss'

interface ISearchListItem {
	movie: IMovie
	handleSelectMovie: () => void
}

const SearchListItem: FC<ISearchListItem> = ({ movie, handleSelectMovie }) => {
	return (
		<Link href={getMovieUrl(movie.slug)} className={styles.link} onClick={handleSelectMovie}>
			<Image
				src={movie.poster}
				width={70}
				height={70}
				alt={movie.title}
				draggable={false}
				style={{
					height: '70px',
					objectFit: 'cover',
					objectPosition: 'top',
				}}
			/>
			<div className={styles.info}>
				<Tooltip
					className={styles.tooltip}
					content={<div className="text-center text-base">{movie.title}</div>}
					css={{ backgroundColor: '#4d4d4d' }}
					hideArrow
					shadow
					isDisabled={movie.title.length < 14}
				>
					<span>{movie.title}</span>
				</Tooltip>
				<div className={styles.rating}>
					<span>{movie.rating}</span>
					<Icon name="AiFillStar" propsIcon={{ color: 'yellow', size: 20 }} />
				</div>
			</div>
		</Link>
	)
}

export default SearchListItem
