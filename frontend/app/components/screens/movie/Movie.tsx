import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { IQueryBySlug } from '@/shared/types/query.types'

import Player from '@/utils/player/player'

import styles from './Movie.module.scss'
import { useMovie } from './useMovie'

const Movie: FC = () => {
	const router = useRouter()
	const { slug } = router.query as IQueryBySlug
	const { data } = useMovie(slug)

	useEffect(() => {
		const player = new Player('.player', {
			search: { kinopoisk: data?.kinopoiskId },
		}).init()
	}, [data])

	return (
		<div className={styles.wrapper}>
			<div className="player"></div>
		</div>
	)
}

export default Movie
