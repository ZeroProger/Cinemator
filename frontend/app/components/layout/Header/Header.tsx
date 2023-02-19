import { Avatar, Dropdown, Navbar } from '@nextui-org/react'
import { FC, Fragment, useEffect, useState } from 'react'

import Logo from '@/components/layout/Logo/Logo'
import UserMenu from '@/components/layout/NavigationContent/Menu/UserMenu/UserMenu'

import useMediaQuery from '@/hooks/useMediaQuery'

import { maxWidthMediaQuery, minWidthMediaQuery } from '@/config/mediaQuery.config'

import styles from './Header.module.scss'

interface IHeader {
	toggledNavigation: boolean
	toggledSidebar: boolean
	onNavigationButtonClick: () => void
	onSidebarButtonClick: () => void
}

const Header: FC<IHeader> = (props) => {
	const isMobile = useMediaQuery(maxWidthMediaQuery)
	const { toggledNavigation, toggledSidebar, onNavigationButtonClick, onSidebarButtonClick } = props

	const [isLoad, setIsLoad] = useState<boolean>(false)

	useEffect(() => {
		setIsLoad(true)
	}, [])

	return (
		<Fragment>
			{isLoad ? (
				<Navbar
					variant={'sticky'}
					css={{
						backgroundColor: '$gray100',
						$$navbarBackgroundColor: '$gray100',
						zIndex: 2,
						height: '60px',
					}}
					disableBlur
					disableShadow
				>
					<Navbar.Brand
						css={{
							marginRight: '20px',
						}}
					>
						<Logo showRule={minWidthMediaQuery} />
						{isMobile && (
							<div className={styles.navigationContainer}>
								<label htmlFor="navigationInput">
									<input
										className={styles.navigationInput}
										type="checkbox"
										name="navigationInput"
										onInput={onNavigationButtonClick}
										checked={toggledNavigation}
									/>
									<div className={styles.navigationLines}>
										<span className={styles.navigationLine}></span>
										<span className={styles.navigationLine}></span>
										<span className={styles.navigationLine}></span>
									</div>
								</label>
							</div>
						)}
					</Navbar.Brand>

					<Navbar.Content
						css={{
							w: '100%',
							justifyContent: 'end',
						}}
					>
						<Dropdown placement="bottom-right" isBordered>
							<Navbar.Item>
								<Dropdown.Trigger>
									<Avatar
										bordered
										as="button"
										color="primary"
										size="md"
										src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
									/>
								</Dropdown.Trigger>
							</Navbar.Item>
							<UserMenu />
						</Dropdown>
						{isMobile && (
							<Navbar.Item>
								<div className={styles.sidebarContainer}>
									<label htmlFor="sidebarInput" className={styles.sidebarLabel}>
										<input
											className={styles.sidebarInput}
											type="checkbox"
											id="sidebarInput"
											checked={toggledSidebar}
											onInput={onSidebarButtonClick}
										/>
										<span className={styles.sidebarLine}></span>
										<span className={styles.sidebarLine}></span>
										<span className={styles.sidebarLine}></span>
									</label>
								</div>
							</Navbar.Item>
						)}
					</Navbar.Content>
				</Navbar>
			) : null}
		</Fragment>
	)
}

export default Header
