import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
// import * as serveStatic from 'serve-static';
// import { join } from 'path';
// import * as winston from 'winston';
// import {
//   WinstonModule,
//   utilities as nestWinstonModuleUtilities,
//   WINSTON_MODULE_PROVIDER,
// } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, {
  //   logger: WinstonModule.createLogger({
  //     transports: [
  //       new winston.transports.Console({
  //         level: process.env.NODE_ENV === 'prod' ? 'info' : 'silly',
  //         format: winston.format.combine(
  //           winston.format.timestamp(),
  //           nestWinstonModuleUtilities.format.nestLike('LoLink', {
  //             prettyPrint: true,
  //           }),
  //         ),
  //       }),
  //     ],
  //   }),
  // });
  const app = await NestFactory.create(AppModule);
  // const uploadsPath = join(__dirname, '..', 'uploads');
  // app.use('/uploads', serveStatic(uploadsPath));
  // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  //   prefix: '/uploads/',
  // });
  app.useGlobalPipes(new ValidationPipe());
  // app.use(passport.initialize());
  // app.useLogger(app.get(WINSTON_MODULE_PROVIDER));
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(3333);
}
bootstrap();
