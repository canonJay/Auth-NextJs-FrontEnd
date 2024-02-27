import { API_URL } from '@/constants'
import { authService } from '@/services/auth/auth.service'
import axios, { CreateAxiosDefaults } from 'axios'
import { errorCatch, getContentType } from './api.helper'

export const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true,
}

export const axiosClassic = axios.create(axiosOptions)

export const axiosInstance = axios.create(axiosOptions)

axiosInstance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		error.message = errorCatch(error)

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return axiosInstance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') authService.logout()
			}
		}

		throw error
	}
)
