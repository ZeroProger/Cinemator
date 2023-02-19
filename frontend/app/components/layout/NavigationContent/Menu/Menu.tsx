import { FC } from 'react'

import MenuItem from '@/components/layout/NavigationContent/Menu/MenuItem'
import { IMenu } from '@/components/layout/NavigationContent/Menu/menu.interface'

import styles from './Menu.module.scss'

const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
	return (
		<div className={styles.menu}>
			<div className={styles.menuTitle}>{title}</div>
			<ul className={styles.menuList}>
				{items.map((item) => (
					<MenuItem item={item} key={item.id} />
				))}
			</ul>
		</div>
	)
}

export default Menu
