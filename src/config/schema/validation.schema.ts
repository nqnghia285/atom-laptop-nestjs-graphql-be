import Joi from 'joi'
import { NodeEnv } from '~/interface'

export const validationSchema = Joi.object().keys({
   NODE_ENV: Joi.string()
      .valid(
         NodeEnv.DEVELOPMENT,
         NodeEnv.PRODUCTION,
         NodeEnv.PROVISION,
         NodeEnv.TEST
      )
      .default(NodeEnv.DEVELOPMENT),
   HOST: Joi.string()
      .valid('0.0.0.0', 'localhost', '127.0.0.1')
      .default('0.0.0.0'),
   PORT: Joi.number().port().default(5000),
   ORIGIN: Joi.string().default(
      `["http://localhost:3000","http://127.0.0.1:3000","http://localhost:5000","http://127.0.0.1:5000"]`
   ),
   URL: Joi.string().uri().default('http://localhost'),
   GRAPHQL_PATH: Joi.string().default('/graphql'),
   GRAPHQL_SCHEMA_PATH: Joi.string().default('src/graphql/schema.gql'),
   DATABASE_URL: Joi.string().uri().required(),
   JWT_KEY: Joi.string().required(),
   TOKEN_NAME: Joi.string().default('Authorization'),
   AUTHOR: Joi.string().default('user'),
   REDIS_SERVER_NAME: Joi.string().default('localhost'),
   REDIS_SERVER_PORT: Joi.number().port().default(6379),
   email: Joi.string().email().required(),
   password: Joi.string().max(16).required(),
   fullname: Joi.string().max(60).required(),
   phone: Joi.string().min(12).max(13).required(),
   role: Joi.string().valid('ADMIN', 'STAFF').default('ADMIN'),
})
