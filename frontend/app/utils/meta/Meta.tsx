import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

import siteLogo from '@/assets/images/cinemator-logo.png'

import { ISeo } from '@/utils/meta/meta.interface'
import { clearText } from '@/utils/string/clearText'

import { siteName, titleMerge } from '@/config/seo.config'
import { APP_URL } from '@/config/url.config'

const Meta: FC<ISeo> = ({ title, description, image, children }) => {
	const { asPath } = useRouter()
	const fullUrl = `${APP_URL}${asPath}`

	return (
		<>
			<Head>
				<title itemProp="headline">{titleMerge(title)}</title>
				{description ? (
					<>
						<meta
							itemProp="description"
							name="description"
							content={clearText(description, 152)}
						></meta>
						<link rel="canonical" href={fullUrl}></link>
						<meta property="og:locale" content="ru"></meta>
						<meta property="og:title" content={titleMerge(title)}></meta>
						<meta property="og:url" content={fullUrl}></meta>
						<meta property="og:image" content={image || siteLogo.src}></meta>
						<meta property="og:site-name" content={siteName}></meta>
						<meta property="og:description" content={clearText(description, 197)}></meta>
					</>
				) : (
					<meta name="robots" content="noindex, nofollow"></meta>
				)}
			</Head>
			{children}
		</>
	)
}

export default Meta
