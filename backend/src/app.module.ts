import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
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
		ConfigModule.forRoot({isGlobal: true}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('POSTGRES_HOST'),
				port: configService.get('POSTGRES_PORT'),
				username: configService.get('POSTGRES_USER'),
				password: configService.get('POSTGRES_PASSWORD'),
				database: configService.get('POSTGRES_DB'),
				entities: ['dist/**/*.entity.{ts,js}'],
				migrations: ['dist/migrations/*.{ts,js}'],
				migrationsTableName: 'typeorm_migrations',
				logger: 'simple-console',
				logging: true,
				synchronize: true,
				autoLoadEntities: true
			}),
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
