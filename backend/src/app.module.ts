import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActorModule } from './actor/actor.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { postgresDevConfig, postgresProdConfig } from './config/postgres.config'
import { FileModule } from './file/file.module'
import { GenreModule } from './genre/genre.module'
import { MovieModule } from './movie/movie.module'
import { ReviewModule } from './review/review.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) =>
				process.env.NODE_ENV === 'production'
					? postgresProdConfig(configService)
					: postgresDevConfig(configService),
		}),
		UserModule,
		AuthModule,
		GenreModule,
		FileModule,
		ActorModule,
		MovieModule,
		ReviewModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
