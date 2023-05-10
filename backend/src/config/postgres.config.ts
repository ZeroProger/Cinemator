import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const postgresDevConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
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
	autoLoadEntities: true,
})

export const postgresProdConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	url: process.env.DATABASE_URL,
	entities: ['dist/**/*.entity.{ts,js}'],
	migrations: ['dist/migrations/*.{ts,js}'],
	migrationsTableName: 'typeorm_migrations',
	ssl: { rejectUnauthorized: false },
	logger: 'simple-console',
	logging: true,
	synchronize: true,
	autoLoadEntities: true,
})
