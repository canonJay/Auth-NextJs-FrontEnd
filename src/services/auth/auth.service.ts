import { axiosClassic, axiosInstance } from '@/api/axios'
import { IAuthForm, IAuthResponse, IUser } from '@/interfaces/interfaces'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

class AuthService {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		return response
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		return response
	}

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		return response
	}

	async getProfile() {
		return axiosInstance.get<IUser>(`/user/profile`)
	}

	// private checkStatus(response: Response) {
	// 	if (response.status >= 400 && response.status < 500) {
	// 		return response
	// 	}
	// }
}

export const authService = new AuthService()
