import { ParsedUrlQuery } from 'querystring'

export interface IQueryBySlug extends ParsedUrlQuery {
	slug: string
}
