'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function Provider({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [client] = useState( new  QueryClient())
	
	return <QueryClientProvider client={ client }>{children}</QueryClientProvider>
}
