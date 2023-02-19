import type { NextPage } from 'next'

import Heading from '@/components/ui/heading/Heading'

const ErrorPage: NextPage = () => {
	return <Heading title="Ошибка 404: Данная страница не найдена" className="bg-black text-white" />
}

export default ErrorPage
