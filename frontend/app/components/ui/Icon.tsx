import loadable, { LoadableComponent } from '@loadable/component'
import { memo } from 'react'
import { IconBaseProps } from 'react-icons/lib'

interface typesPropsIcon {
	name: string
	propsIcon?: IconBaseProps
}

export const Icon = memo(function Icon({ name, propsIcon }: typesPropsIcon): JSX.Element {
	const lib = name
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.split(' ')[0]
		.toLocaleLowerCase()
	const ElementIcon: LoadableComponent<IconBaseProps> = loadable(
		() => import(`react-icons/${lib}/index.js`),
		{
			resolveComponent: (el: JSX.Element) => el[name as keyof JSX.Element],
		}
	)

	return <ElementIcon {...propsIcon} />
})
