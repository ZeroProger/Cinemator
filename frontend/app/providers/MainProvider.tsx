import { NextUIProvider, createTheme } from '@nextui-org/react'
import { SSRProvider } from '@react-aria/ssr'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '@/components/layout/Layout'

const queryClient = new QueryClient()

const nextUITheme = createTheme({
	type: 'dark',
	theme: {
		colors: {
			primaryLight: '$green200',
			primaryLightHover: '$green300',
			primaryLightActive: '$green400',
			primaryLightContrast: '$green600',
			primary: '#E30B13',
			secondary: '#940407',
			primaryBorder: '$green500',
			primaryBorderHover: '$green600',
			primarySolidHover: '$green700',
			primarySolidContrast: '$white',
			primaryShadow: '$green500',
			link: '#8d4ede',
			background: 'rgb(51 51 51 / var(--tw-bg-opacity))',
		},
	},
})

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SSRProvider>
				<NextUIProvider disableBaseline theme={nextUITheme}>
					<Layout>{children}</Layout>
				</NextUIProvider>
			</SSRProvider>
		</QueryClientProvider>
	)
}

export default MainProvider
