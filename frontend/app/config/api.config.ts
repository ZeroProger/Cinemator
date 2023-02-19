export const API_URL = `${process.env.APP_URL}/api`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`

export const getGenresUrl = (path: string) => `/genres${path}`
export const getActorsUrl = (path: string) => `/actors${path}`
export const getFilesUrl = (path: string) => `/files${path}`
export const getAuthUrl = (path: string) => `/auth${path}`
export const getUsersUrl = (path: string) => `/users${path}`
export const getMoviesUrl = (path: string) => `/movies${path}`
export const getReviewsUrl = (path: string) => `/reviews${path}`
