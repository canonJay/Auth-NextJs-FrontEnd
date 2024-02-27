'use client'

import { Button } from '@/components/ui/button'
import { useProfile } from '@/hooks/useProfile'
import { authService } from '@/services/auth/auth.service'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const Iw = () => {
	const { data, isPending, error } = useProfile()

	const { push } = useRouter()

	if (error) return <div>{error.message}</div>

	if (isPending) return <div>loading...</div>

	return (
		<div className='flex flex-col gap-5'>
			Name: {data?.name}, email: {data?.email}
			{data?.wallets?.length ? (
				<div>Wallets: {data?.wallets?.map(w => <span>{w.address}</span>)}</div>
			) : null}
			<Button>Create wallet</Button>
			<Button
				onClick={() => {
					authService.logout()

					toast('Signed out', {
						icon: '👋',
						description: 'Signed out successfully',

						action: {
							label: 'Ok',
							onClick: () => console.log('Undo'),
						},
					})

					push('/login')
				}}
				variant='destructive'
			>
				Sign out
			</Button>
		</div>
	)
}
