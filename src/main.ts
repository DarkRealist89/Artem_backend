import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { json, urlencoded } from "express";
import { ConfigService } from "./services/config.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ["error", "warn"],
    });
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));

    const configService = app.get(ConfigService);

    if (configService.development) {
        app.enableCors();
    }

    // глобальный валидатор данных
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            transform: true,
        }),
    );

    // добавление документации Swagger
    let documentBuilder = new DocumentBuilder()
        .setTitle("API")
        .setDescription("Зона тестирования API")
        .setVersion("1.0");
    if (!configService.development) {
        documentBuilder = documentBuilder.addServer("/api", "Api server");
    }
    const swaggerConfig = documentBuilder.build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup("swagger", app, document);

    // запуск сервера
    // во всех сервисах выполняется onModuleInit()
    // во всех сервисах выполняется onApplicationBootstrap()
    await app.init();

    await app.listen(80);

    console.log(">>> Server started");
}

// eslint-disable-next-line no-floating-promise/no-floating-promise
bootstrap();
