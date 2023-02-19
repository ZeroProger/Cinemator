import { FC, PropsWithChildren } from 'react'

import Search from '../Search/Search'
import styles from '../Sidebar.module.scss'

interface Props extends PropsWithChildren {}

const SidebarContent: FC<Props> = () => {
	return (
		<div className={styles.sidebarWrapper}>
			<div className={styles.sidebarContent}>
				<div className={styles.sidebarItem}>
					<Search />
				</div>
			</div>
		</div>
	)
}

export default SidebarContent
