import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { IMenuItem } from '@/components/layout/NavigationContent/Menu/menu.interface'
import { Icon } from '@/components/ui/Icon'

import styles from './Menu.module.scss'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { asPath } = useRouter()

	return (
		<li key={item.id} className={cn({ [styles.active]: asPath === item.link })}>
			<Link href={item.link}>
				<Icon name={item.icon} />
				<span>{item.title}</span>
			</Link>
		</li>
	)
}

export default MenuItem
