import { LoggerService } from '@libs/logger'
import { PrismaService } from '@libs/prisma'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { graphqlUploadExpress as GraphqlUploadExpress } from 'graphql-upload'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js'
import { address } from 'ip'
import { AppModule } from '~/app.module'
import { Env, System } from '~/interface'

async function bootstrap() {
   const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
   })

   const logger = app.get(LoggerService)
   app.useLogger(logger)

   const configService = app.get(ConfigService)
   const host = configService.get<System>(Env.SYSTEM).host
   const port = configService.get<System>(Env.SYSTEM).port
   const origin = configService.get<System>(Env.SYSTEM).origin
   const graphqlPath = configService.get<System>(Env.SYSTEM).graphql_path

   const prismaService = app.get(PrismaService)
   await prismaService.enableShutdownHooks(app)

   app.setGlobalPrefix('api', {
      exclude: [graphqlPath],
   })

   // Config cors for RESTful API
   app.enableCors({
      origin: origin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   })

   app.use(cookieParser())

   app.use(
      graphqlPath,
      (graphqlUploadExpress as typeof GraphqlUploadExpress)({
         maxFileSize: 1e7,
         maxFiles: 10,
      })
   )

   await app.listen(port, host, async () => {
      const announcement = {
         url: await app.getUrl(),
         address: address(),
         message: `NestJS Server is running!`,
      }

      logger.log(announcement, 'Main')
   })
}

bootstrap()
