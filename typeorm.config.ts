import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

const dataSource = new DataSource({
	type: 'postgres',
	username: configService.getOrThrow('POSTGRES_USER'),
	password: configService.getOrThrow('POSTGRES_PASSWORD'),
	host: configService.getOrThrow('POSTGRES_HOST'),
	database: configService.getOrThrow('POSTGRES_DB'),
	port: parseInt(configService.getOrThrow('POSTGRES_PORT')),
	entities: ['dist/**/*.entity{.ts,.js}'],
	migrations: ['migrations/**']

	// autoLoadEntities: true,
});

export default dataSource;