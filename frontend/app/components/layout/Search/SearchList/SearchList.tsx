import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import styles from './SearchList.module.scss'
import SearchListItem from './SearchListItem'

interface ISearchList {
	movies: IMovie[]
	handleSelectMovie: () => void
}

const SearchList: FC<ISearchList> = ({ movies, handleSelectMovie }) => {
	return (
		<div className={styles.list}>
			{movies.length ? (
				movies.map((movie) => (
					<SearchListItem key={movie.id} movie={movie} handleSelectMovie={handleSelectMovie} />
				))
			) : (
				<div className="text-white text-center text-lg my-4">Фильмы не найдены</div>
			)}
		</div>
	)
}

export default SearchList
