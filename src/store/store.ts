import { create } from 'zustand'

export interface IUser {
	id: number | null
	name: string
	email: string
}

export interface IUserStore {
	user: IUser | null
	setUser: (data: IUser | null) => void
}

export const useUserStore = create<IUserStore>(set => ({
	user: null,
	setUser: (data: IUser | null) =>
		set(state => ({ user: (state.user = data) })),
}))
