import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';


@Module({
	imports: [
		ConfigModule.forRoot(
			{
				isGlobal: true
			}
		),
		TypeOrmModule.forRootAsync(
			{
				imports: [ConfigModule],
				inject: [ConfigService],
				useFactory: async ( cs: ConfigService) => ({
					type: 'postgres',
					username: cs.getOrThrow('POSTGRES_USER'),
					password: cs.getOrThrow('POSTGRES_PASSWORD'),
					host: cs.getOrThrow('POSTGRES_HOST'),
					database: cs.getOrThrow('POSTGRES_DB'),
					port: parseInt(cs.getOrThrow('POSTGRES_PORT') || '5432'),
					autoLoadEntities: true
				})
			}
		),


		UserModule,
		TasksModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
}
