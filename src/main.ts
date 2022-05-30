import { LoggerService } from '@libs/logger'
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { readFileSync } from 'fs-extra'
// import { graphqlUploadExpress } from 'graphql-upload'
import { address } from 'ip'
import { join } from 'path'
import { AppModule } from '~/app.module'
import { Env, NodeEnv, System } from '~/interface'

async function bootstrap() {
   const httpsOptions: HttpsOptions | undefined =
      process.env.NODE_ENV === NodeEnv.PRODUCTION
         ? undefined
         : {
              cert: readFileSync(join(process.cwd(), 'src/ssl/cert.pem')),
              key: readFileSync(join(process.cwd(), 'src/ssl/key.pem')),
           }

   const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
      httpsOptions,
   })
   const logger = app.get(LoggerService)
   app.useLogger(logger)

   const configService = app.get(ConfigService)
   const host = configService.get<System>(Env.SYSTEM).host
   const port = configService.get<System>(Env.SYSTEM).port
   const origin = configService.get<System>(Env.SYSTEM).origin
   const nodeEnv = configService.get<System>(Env.SYSTEM).node_env
   // const graphqlPath = configService.get<System>(Env.SYSTEM).graphql_path

   app.setGlobalPrefix('api', {
      exclude: [configService.get<System>(Env.SYSTEM).graphql_path],
   })

   app.enableCors({
      origin: origin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
   })

   app.use(cookieParser())

   // app.use(
   //    graphqlPath,
   //    graphqlUploadExpress({
   //       maxFileSize: 1e7,
   //       maxFiles: 10,
   //    })
   // )

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
