import { AuthForm } from '@/components/AuthForm/AuthForm'
import Link from 'next/link'

export default function RegisterPage() {
	return (
		<div>
			<div className='absolute top-0 right-0 p-12'>
				<Link href={'/login'}>{'Sing in'}</Link>
			</div>
			<AuthForm isLoginForm={false} />
		</div>
	)
}
