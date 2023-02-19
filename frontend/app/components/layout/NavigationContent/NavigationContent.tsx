import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import Logo from '@/components/layout/Logo/Logo'
import Menu from '@/components/layout/NavigationContent/Menu/Menu'
import { mainMenu } from '@/components/layout/NavigationContent/Menu/menu.data'

import { maxWidthMediaQuery } from '@/config/mediaQuery.config'

import styles from '../Sidebar.module.scss'

import GenresMenu from './Menu/GenresMenu/GenresMenu'
import navStyles from './NavigationContent.module.scss'

interface Props extends PropsWithChildren {}

const NavigationContent: FC<Props> = () => {
	return (
		<div className={styles.sidebarWrapper}>
			<div className={cn(styles.sidebarContent, navStyles.navigationContent)}>
				<Logo showRule={maxWidthMediaQuery} />
				<Menu menu={mainMenu} />
				<GenresMenu />
			</div>
		</div>
	)
}

export default NavigationContent
