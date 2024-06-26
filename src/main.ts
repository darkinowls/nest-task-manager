import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";
import { EmptyObjectPipe } from "@src/empty-object.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      }

    ),
    new EmptyObjectPipe()
  );

  // TODO: Enable CORS add env origins
  app.enableCors()

  await initSwagger(app);
  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap();


const initSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle("Tasks example")
    .setDescription("The tasks API description")
    .setVersion("1.0")
    .addBearerAuth( )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);
};