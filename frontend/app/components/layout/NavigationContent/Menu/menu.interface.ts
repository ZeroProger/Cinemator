export interface IMenuItem {
	id: number
	icon: string
	title: string
	link: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}

export interface IUserMenuItem {
	id: number
	title: string
	link: string
	addDivider: boolean
}

export interface IUserMenu {
	items: IUserMenuItem[]
}
