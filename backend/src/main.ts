import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: 'https://cinemator-umber.vercel.app',
			credentials: true,
		},
	})
	app.setGlobalPrefix('api')
	await app.listen(parseInt(process.env.PORT) || 8800, '0.0.0.0')
}

bootstrap()
