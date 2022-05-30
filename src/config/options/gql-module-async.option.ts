import { ApiConfigModule, ApiConfigService } from '@libs/api-config'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GqlModuleAsyncOptions, GqlOptionsFactory } from '@nestjs/graphql'
// import { BaseRedisCache } from 'apollo-server-cache-redis'
import {
   ApolloServerPluginCacheControl,
   ApolloServerPluginLandingPageDisabled,
   ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'
// import Redis from 'ioredis'
import { join } from 'path'
import { formatResponse } from '~/handlers'
import { Cache, NodeEnv } from '~/interface'
import { HandleResolverParams } from '~/plugins'

export const gqlModuleAsyncOptions: GqlModuleAsyncOptions<
ApolloDriverConfig,
GqlOptionsFactory<ApolloDriverConfig>
> = {
   driver: ApolloDriver,
   imports: [ApiConfigModule],
   inject: [ApiConfigService],
   useFactory: async (config: ApiConfigService) => ({
      debug: config.system.node_env !== NodeEnv.PRODUCTION,
      dateScalarMode: 'timestamp',
      validate: false,
      sortSchema: true,
      autoSchemaFile: join(process.cwd(), config.system.graphql_schema_path),
      playground: false,
      context: ({ req, res }: ExpressContext) => {
         return { req, res, user: req.user }
      },
      cors: {
         origin: config.system.origin,
         credentials: true,
         methods: ['GET', 'POST', 'PUT', 'DELETE'],
      },
      path: config.system.graphql_path,
      /**
       * ! Be careful what we do here.
       * ! We can change anything in the response object before it is sent to client.
       * ! And that can lead to some unexpected errors.
       */
      formatResponse,
      // persistedQueries: {
      //    cache: new BaseRedisCache({
      //       client: new Redis({
      //          host: config.system.redis_server_name,
      //          port: config.system.redis_server_port,
      //       }),
      //    }),
      //    ttl: null, // Until APQs are overwritten by the cache's standard eviction policy
      // },
      plugins: [
         config.system.node_env !== NodeEnv.PRODUCTION
            ? ApolloServerPluginLandingPageGraphQLPlayground()
            : ApolloServerPluginLandingPageDisabled(),
         /**
          * ? Plugin ApolloServerPluginCacheControl is useful when you use the @cacheControl directive
          * ? in the graphql's schema.
          */
         ApolloServerPluginCacheControl({
            defaultMaxAge: Cache.MAX_AGE,
            calculateHttpHeaders: false,
         }),
         HandleResolverParams,
      ],
   }),
}
