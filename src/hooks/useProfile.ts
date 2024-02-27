import { IUser } from '@/interfaces/interfaces'
import { authService } from '@/services/auth/auth.service'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const { isPending, error, data } = useQuery<IUser>({
		queryKey: ['profile'],
		queryFn: () => authService.getProfile().then((res) => res.data),
	})

	return {
		data,
		isPending,
		error,
	}
}
