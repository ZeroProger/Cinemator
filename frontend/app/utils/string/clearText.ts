export const clearText = (_string: string, limit: null | number = null): string => {
	let result = _string
		.replace(/<[^>]+>/g, '')
		.replace(/&[^;]+./g, ' ')
		.replace(
			/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC80-\uDFFF]|\u083D[\uDC00-\uDFFF]|[\u2011-\u26FF}|\u083E[\uDD10-\uDDFF])/g,
			''
		)
	if (limit && result.length > limit) result = result.slice(0, limit) + '...'
	return result
}
