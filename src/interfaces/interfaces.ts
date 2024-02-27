export interface IAuthForm {
	name?: string
	email: string
	password: string
}

export interface IWallet {
	id: string
	address: string
	privateKey?: string
}

export interface IUser {
	id: string
	name: string
	email: string
	wallets?: IWallet[]
}

export interface IAuthResponse {
	user: IUser
	accessToken: string
}
