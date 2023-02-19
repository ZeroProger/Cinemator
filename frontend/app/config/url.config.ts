export const APP_URL = `${process.env.APP_URL}`

export const getMovieUrl = (slug: string) => `/movies/${slug}`
export const getGenreUrl = (slug: string) => `/genres/${slug}`
export const getActorUrl = (slug: string) => `/actors/${slug}`
export const getAdminUrl = (url: string) => `/admin${url}`
export const getAdminHomeUrl = () => '/admin'
