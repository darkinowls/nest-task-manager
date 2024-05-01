import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { EmptyObjectPipe } from "@src/empty-object.pipe";
// import { EmptyObjectPipe } from "@src/empty-object.pipe";
// import { I18nValidationPipe } from "nestjs-i18n";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
      {
        whitelist: true,
        forbidNonWhitelisted: true,
      }
    ),
    new EmptyObjectPipe(),
  );
  await initSwagger(app);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();


const initSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle("Tasks example")
    .setDescription("The tasks API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);
}