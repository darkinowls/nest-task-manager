import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
// import { AcceptLanguageResolver, HeaderResolver, I18nModule, QueryResolver } from "nestjs-i18n";
// import { ConfigService } from "@nestjs/config";
// import { join } from "path";

@Module({
  imports: [
    TasksModule,
    // I18nModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     fallbackLanguage: configService.getOrThrow('FALLBACK_LANGUAGE'),
    //     loaderOptions: {
    //       path: join(__dirname, '/i18n/'),
    //       watch: true,
    //     },
    //   }),
    //   resolvers: [
    //     { use: QueryResolver, options: ['lang'] },
    //     AcceptLanguageResolver,
    //     new HeaderResolver(['x-lang']),
    //   ],
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
