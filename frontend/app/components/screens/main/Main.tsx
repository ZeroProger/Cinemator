import { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

const Main: FC = () => {
	return (
		<Meta
			title="Смотрите фильмы и сериалы онлайн"
			description="Смотрите фильмы и сериалы онлайн, бесплатно и в хорошем качестве"
		>
			<Heading title="Смотрите фильмы и сериалы онлайн" className="text-gray-200 mb-8 text-2xl" />
		</Meta>
	)
}

export default Main
