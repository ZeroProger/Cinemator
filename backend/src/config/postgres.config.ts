import { ConfigService } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'

export const getPostgresDbConfig = async (
	configService: ConfigService
): Promise<DataSourceOptions> => ({
	type: 'postgres',
	host: configService.get('POSTGRES_HOST'),
	port: configService.get('POSTGRES_PORT'),
	username: configService.get('POSTGRES_USER'),
	password: configService.get('POSTGRES_PASSWORD'),
	database: configService.get('POSTGRES_DB'),
	entities: ['dist/**/*.entity{.ts,.js}'],
	synchronize: true,
})
