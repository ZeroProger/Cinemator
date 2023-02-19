import { Text } from '@nextui-org/react'
import { FC, Fragment, useEffect, useState } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'

const Logo: FC<{ showRule: string }> = ({ showRule }) => {
	const isShow = useMediaQuery(showRule)
	const [isLoad, setIsLoad] = useState<boolean>(false)

	useEffect(() => {
		setIsLoad(true)
	}, [])

	return (
		<Fragment>
			{isLoad && isShow && (
				<div className="flex flex-row gap-2 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-movie"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="#E30B13"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
						<path d="M8 4l0 16"></path>
						<path d="M16 4l0 16"></path>
						<path d="M4 8l4 0"></path>
						<path d="M4 16l4 0"></path>
						<path d="M4 12l16 0"></path>
						<path d="M16 8l4 0"></path>
						<path d="M16 16l4 0"></path>
					</svg>
					<Text size={'20px'} color={'#fff'}>
						CINEMATOR
					</Text>
				</div>
			)}
		</Fragment>
	)
}

export default Logo
