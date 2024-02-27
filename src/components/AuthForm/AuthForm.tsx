'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IAuthForm } from '@/interfaces/interfaces'
import { authService } from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

export function AuthForm({ isLoginForm }: { isLoginForm: boolean }) {
	const { push } = useRouter()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<IAuthForm>()

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		isLoginForm ? mutateLogin(data) : mutateRegister(data)
	}
	const {
		mutate: mutateLogin,
		isPending: isLoginPending,
		error: loginError,
	} = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthForm) => authService.main('login', data),
		onSuccess({ data }) {
			push('/profile')

			toast('Signed in', {
				icon: '👽',
				description: 'Signed in successfully',

				action: {
					label: 'Nice!!!',
					onClick: () => console.log('Undo'),
				},
			})
		},
		onError(error) {
			// @ts-ignore

			toast('Samthing went wrong', {
				icon: '🤬',
				// @ts-ignore
				description: error.response.data.message,
				action: {
					label: 'Ok',
					onClick: () => console.log('Undo'),
				},
			})
		},
	})

	const {
		mutate: mutateRegister,
		isPending: isRegisterPending,
		error: registerError,
	} = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IAuthForm) => authService.main('register', data),
		onSuccess({ data }) {
			push('/profile')

			toast('Signed in', {
				icon: '👽',
				description: 'Signed in successfully',

				action: {
					label: 'Nice!!!',
					onClick: () => console.log('Undo'),
				},
			})
		},
		onError(error) {
			// @ts-ignore

			toast('Samthing went wrong', {
				icon: '🤬',
				// @ts-ignore
				description: error.response.data.message,
				action: {
					label: 'Ok',
					onClick: () => console.log('Undo'),
				},
			})
		},
	})

	const isPending = isLoginPending || isRegisterPending

	return (
		<>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>{isLoginForm ? 'Login' : 'Register'}👻</CardTitle>
					<CardDescription>Authorization </CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid w-full items-center gap-4'>
							{isLoginForm ? null : (
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='name'>Name</Label>
									<Input
										{...register('name', { required: true })}
										id='name'
										placeholder='Name'
									/>
								</div>
							)}
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Email</Label>
								<Input
									{...register('email', { required: true })}
									placeholder='Email'
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Password</Label>
								<Input
									{...register('password', { required: true })}
									placeholder='Password'
								/>
							</div>
						</div>
						<Button disabled={isPending} className='mt-4' type={'submit'}>
							{isLoginForm ? 'Login' : 'Register'}
						</Button>
					</form>

					{errors.email && (
						<div className='w-full mt-3 flex flex-col justify-center items-center'>
							{errors.email && (
								<span className='text-red-500 text-center'>
									Email is required
								</span>
							)}

							{errors.password && (
								<span className='text-red-500'>Password is required</span>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</>
	)
}
