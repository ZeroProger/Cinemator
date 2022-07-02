import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from '../user.entity'

type TypeData = keyof UserModel

export const User = createParamDecorator(
	(data: TypeData, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
