import { API_URL } from '@/constants'
import { IUser } from '@/interfaces/interfaces'
import { cookies } from 'next/headers'
import { Iw } from './i'

async function getProfile(): Promise<IUser> {
	'use server'
	const res = await fetch(`${API_URL}/user/profile`, {
		method: 'GET',
		credentials: 'include',
		headers: { Cookie: cookies().toString() },
	})

	const data = await res.json()

	return data
}

export default async function ProfilePage() {
	const profile = await getProfile()

	return (
		<main className='flex justify-center items-center h-screen flex-col gap-8'>
			<span> SSR: {profile.name}</span>

			<div className='flex justify-center items-center flex-col gap-3'>
				<span className='text-gray-500'>// none SSR //</span>
				<Iw />
			</div>
		</main>
	)
}
