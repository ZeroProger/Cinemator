import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getPostgresDbConfig } from './config/postgres.config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { DataSource } from 'typeorm'
import { GenreModule } from './genre/genre.module'
import { FileModule } from './file/file.module'
import { ActorController } from './actor/actor.controller'
import { ActorModule } from './actor/actor.module'
import { MovieModule } from './movie/movie.module'
import { ReviewController } from './review/review.controller'
import { ReviewModule } from './review/review.module'
import { MulterModule } from '@nestjs/platform-express/multer'
import { memoryStorage } from 'multer'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getPostgresDbConfig,
			dataSourceFactory: async (config) => {
				const dataSource = await new DataSource(config).initialize()
				return dataSource
			},
		}),
		AuthModule,
		UserModule,
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
