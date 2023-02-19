import { useRouter } from 'next/router'
import { FC, Fragment, PropsWithChildren, useEffect, useState } from 'react'
import Sidebar from 'react-sidebar'

import Header from '@/components/layout/Header/Header'
import NavigationContent from '@/components/layout/NavigationContent/NavigationContent'
import SidebarContent from '@/components/layout/SidebarContent/SidebarContent'

import useMediaQuery from '@/hooks/useMediaQuery'

import { minWidthMediaQuery } from '@/config/mediaQuery.config'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const isDocked = useMediaQuery(minWidthMediaQuery)
	const [toggledNavigation, setToggledNavigation] = useState(false)
	const [toggledSidebar, setToggledSidebar] = useState(false)
	const router = useRouter()

	useEffect(() => {
		setToggledNavigation(false)
		setToggledSidebar(false)
	}, [router.asPath])

	const handleToggleNavigation = () => {
		if (isDocked) return
		setToggledNavigation(!toggledNavigation)
	}

	const handleToggleSidebar = () => {
		if (isDocked) return
		setToggledSidebar(!toggledSidebar)
	}

	useEffect(() => {
		if (isDocked) {
			if (toggledNavigation) {
				setToggledNavigation(false)
			}
			if (toggledSidebar) {
				setToggledSidebar(false)
			}
		}
	}, [isDocked])

	return (
		<Fragment>
			<Header
				toggledNavigation={toggledNavigation}
				toggledSidebar={toggledSidebar}
				onNavigationButtonClick={handleToggleNavigation}
				onSidebarButtonClick={handleToggleSidebar}
			/>
			<div className={styles.layoutWrapper}>
				<Sidebar
					sidebar={<NavigationContent />}
					open={toggledNavigation}
					onSetOpen={() => handleToggleNavigation()}
					docked={isDocked}
					shadow={false}
					touch={true}
					touchHandleWidth={40}
					sidebarClassName={styles.sidebar}
					rootClassName={styles.sidebarRoot}
					styles={{
						sidebar: {
							borderRightWidth: '1px',
							borderRightColor: 'rgb(58 58 58 / var(--tw-bg-opacity));',
							position: 'fixed',
							top: '60px',
							zIndex: isDocked ? '2' : '3',
						},
						overlay: {
							zIndex: isDocked ? '1' : '2',
						},
					}}
				></Sidebar>
				<div className={styles.contentWrapper}>{children}</div>
				<Sidebar
					sidebar={<SidebarContent />}
					open={toggledSidebar}
					pullRight
					onSetOpen={() => handleToggleSidebar()}
					docked={isDocked}
					touchHandleWidth={40}
					sidebarClassName={styles.sidebar}
					rootClassName={styles.sidebarRoot}
					shadow={false}
					styles={{
						sidebar: {
							borderLeftWidth: '1px',
							borderLeftColor: 'rgb(58 58 58 / var(--tw-bg-opacity));',
							position: 'fixed',
							top: '60px',
							zIndex: isDocked ? '2' : '3',
						},
						overlay: {
							zIndex: isDocked ? '1' : '2',
						},
					}}
				></Sidebar>
			</div>
		</Fragment>
	)
}

export default Layout
