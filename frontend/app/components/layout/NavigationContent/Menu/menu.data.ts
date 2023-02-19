import { IMenu, IUserMenu } from '@/components/layout/NavigationContent/Menu/menu.interface'

export const mainMenu: IMenu = {
	title: 'Меню',
	items: [
		{ id: 1, icon: 'MdHome', title: 'Главная', link: '/' },
		{ id: 2, icon: 'MdExplore', title: 'Жанры', link: '/genres' },
		{ id: 3, icon: 'HiUsers', title: 'Актеры', link: '/actors' },
		{ id: 4, icon: 'MdRefresh', title: 'Новинки', link: '/new-movies' },
		{ id: 5, icon: 'MdLocalFireDepartment', title: 'Популярно сейчас', link: '/trending' },
	],
}

export const userMenu: IUserMenu = {
	items: [
		{ id: 1, title: 'Мой профиль', link: '/profile', addDivider: false },
		{ id: 2, title: 'Настройки', link: '/settings', addDivider: true },
		{ id: 3, title: 'Помощь', link: '/help', addDivider: false },
		{ id: 4, title: 'Обратная связь', link: '/feedback', addDivider: false },
		{ id: 5, title: 'Выйти', link: '/logout', addDivider: true },
	],
}

export const adminMenu: IMenu = {
	title: 'Администрирование',
	items: [{ id: 1, icon: 'MdAdminPanelSettings', title: 'Админ-панель', link: '/admin' }],
}
