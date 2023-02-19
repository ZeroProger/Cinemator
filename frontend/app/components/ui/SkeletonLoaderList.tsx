import cn from 'classnames'
import { FC } from 'react'

import SkeletonLoader from './SkeletonLoader'

interface ISkeletonLoaderList {
	count: number
	height: number
	className?: string
}

const SkeletonLoaderList: FC<ISkeletonLoaderList> = ({ count, height, className }) => {
	const arr = new Array(count).fill(1)
	return (
		<>
			{arr.map(() => (
				<SkeletonLoader className={cn(`h-[${height}px]`, className)}></SkeletonLoader>
			))}
		</>
	)
}

export default SkeletonLoaderList
