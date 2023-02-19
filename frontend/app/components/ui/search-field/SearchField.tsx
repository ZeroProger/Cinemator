import { FormElement, Input } from '@nextui-org/react'
import { ChangeEvent, FC } from 'react'

import { SearchIcon } from '../SearchIcon'

import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<FormElement>) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
	return (
		<div className={styles.search}>
			<Input
				aria-label="Поиск фильмов"
				value={searchTerm}
				onChange={handleSearch}
				clearable
				contentLeft={<SearchIcon fill="#666666" size={20} />}
				contentLeftStyling={false}
				bordered
				size="md"
				fullWidth
				animated={false}
				css={{
					$$inputColor: '#333333',
					w: '100%',
					'& .nextui-input': {
						fontSize: '1rem',
					},
					'& .nextui-input-content--left': {
						h: '100%',
						ml: '$4',
						dflex: 'center',
					},
					'& .nextui-input-clear-button': {
						mr: '0.5rem',
						h: '100%',
						backgroundColor: '#333333',
						borderRadius: '1rem',
					},
					'& .nextui-input-clear-button:hover': {
						opacity: 1,
					},
				}}
				placeholder="Название фильма..."
			/>
		</div>
	)
}

export default SearchField
