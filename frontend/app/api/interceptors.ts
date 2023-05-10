import axios from 'axios'

import { API_SERVER_URL, API_URL } from '@/config/api.config'

import { IS_PRODUCTION } from './../config/constants'

export const axiosClassic = axios.create({
	baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})
