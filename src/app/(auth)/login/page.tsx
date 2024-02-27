import { AuthForm } from '@/components/AuthForm/AuthForm'
import Link from 'next/link'

//dynamic import AuthForm no SSR

export default function LoginPage() {
	return (
		<div>
			<div className='absolute top-0 right-0 p-12'>
				<Link href={'/register'}>{'Sing up'}</Link>
			</div>
			<AuthForm isLoginForm={true} />
		</div>
	)
}
