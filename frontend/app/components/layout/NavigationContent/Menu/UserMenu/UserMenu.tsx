import { Dropdown } from '@nextui-org/react'
import Link from 'next/link'
import { FC } from 'react'

import { userMenu } from '@/components/layout/NavigationContent/Menu/menu.data'

const UserMenu: FC = () => {
	return (
		<Dropdown.Menu
			aria-label="User menu actions"
			onAction={(actionKey) => console.log({ actionKey })}
		>
			{userMenu.items.map((item) => (
				<Dropdown.Item
					key={item.link}
					withDivider={item.addDivider}
					css={{ flexDirection: 'column', alignItems: 'stretch' }}
					color={item.link === '/logout' ? 'error' : undefined}
				>
					<Link href={item.link} className="flex items-center h-full">
						{item.title}
					</Link>
				</Dropdown.Item>
			))}
		</Dropdown.Menu>
	)
}

export default UserMenu

{
	/*
	<Fragment>
				<Dropdown.Item key="user-info" withDivider css={{ height: '$18' }}>
					<Text b color="inherit" css={{ d: 'flex' }}>
						Вы вошли в аккаунт
					</Text>
					<Text b color="inherit" css={{ d: 'flex' }}>
						zoey@example.com
					</Text>
				</Dropdown.Item>
				{userMenu.items.map((item) => (
					<UserMenuItem key={item.link} item={item}></UserMenuItem>
				))}
			</Fragment>
	<Dropdown.Item key="profile" css={{ height: '$18' }}>
							<Text b color="inherit" css={{ d: 'flex' }}>
								Signed in as
							</Text>
							<Text b color="inherit" css={{ d: 'flex' }}>
								zoey@example.com
							</Text>
						</Dropdown.Item>
						<Dropdown.Item key="settings" withDivider>
							My Settings
						</Dropdown.Item>
						<Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
						<Dropdown.Item key="analytics" withDivider>
							Analytics
						</Dropdown.Item>
						<Dropdown.Item key="system">System</Dropdown.Item>
						<Dropdown.Item key="configurations">Configurations</Dropdown.Item>
						<Dropdown.Item key="help_and_feedback" withDivider>
							Help & Feedback
						</Dropdown.Item>
						<Dropdown.Item key="logout" withDivider color="error">
							Log Out
						</Dropdown.Item>*/
}
