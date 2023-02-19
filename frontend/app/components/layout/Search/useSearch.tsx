import { FormElement } from '@nextui-org/react'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const debouncedSearch = useDebounce(searchTerm, 400)

	const { isSuccess, data } = useQuery(
		['search movie list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch, 1, 5),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	)

	const handleSearch = (event: ChangeEvent<FormElement>) => {
		setSearchTerm(event.target.value)
	}

	const resetSearch = () => {
		setSearchTerm('')
	}

	return { isSuccess, handleSearch, resetSearch, data, searchTerm }
}
