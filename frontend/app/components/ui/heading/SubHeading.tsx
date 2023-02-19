import cn from 'classnames'
import parse from 'html-react-parser'
import { FC } from 'react'

interface ISubHeading {
	text: string
	className?: string
}

const SubHeading: FC<ISubHeading> = ({ text, className = '' }) => {
	return (
		<div className={cn('text-lg font-light text-white text-opacity-60', className)}>
			{parse(text)}
		</div>
	)
}

export default SubHeading
