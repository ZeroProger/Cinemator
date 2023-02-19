import { FC, useEffect } from 'react'

import SearchField from '@/components/ui/search-field/SearchField'

import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'

interface ISearch {}

const Search: FC<ISearch> = () => {
	const { isSuccess, handleSearch, resetSearch, data, searchTerm } = useSearch()

	useEffect(() => {
		console.log(data)
	}, [isSuccess])

	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data?.data || []} handleSelectMovie={resetSearch} />}
		</div>
	)
}

export default Search
