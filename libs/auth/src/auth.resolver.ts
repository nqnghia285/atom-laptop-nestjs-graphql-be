import { ApiConfigService } from '@libs/api-config'
import { LoggerService } from '@libs/logger'
import { ValidationPipe } from '@nestjs/common'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { AuthLogInArgs, Response } from '~/graphql/typedefs'
import { IContext } from '~/interface'
import { AuthService } from './auth.service'

@Resolver()
export class AuthResolver {
   constructor(
      private readonly auth: AuthService,
      private readonly apiConfig: ApiConfigService,
      private readonly logger: LoggerService
   ) {}

   @Query(() => Response)
   async logIn(
      @Args(new ValidationPipe()) { username, password }: AuthLogInArgs,
      @Context() { req, res }: IContext
   ) {
      const response: Response = {
         action: 'logIn',
         isSuccess: false,
         message: `Fail`,
         data: null,
         errors: [],
      }

      this.logger.log(req.body, `${AuthResolver.name}:body`)
      this.logger.log(req.params, `${AuthResolver.name}:params`)
      this.logger.log(req.query, `${AuthResolver.name}:query`)
      this.logger.log(req.authInfo, `${AuthResolver.name}:authInfo`)
      this.logger.log(req.baseUrl, `${AuthResolver.name}:baseUrl`)
      this.logger.log(req.url, `${AuthResolver.name}:url`)
      this.logger.log(req.cookies, `${AuthResolver.name}:cookies`)
      this.logger.log(req.ip, `${AuthResolver.name}:ip`)
      this.logger.log(req.hostname, `${AuthResolver.name}:hostname`)
      this.logger.log(req.method, `${AuthResolver.name}:method`)
      this.logger.log(req.protocol, `${AuthResolver.name}:protocol`)
      this.logger.log(req.subdomains, `${AuthResolver.name}:subdomains`)
      this.logger.log(req.secret, `${AuthResolver.name}:secret`)

      await this.auth
         .validateUser(username, password)
         .then((profile) => {
            if (profile) {
               response.isSuccess = true
               response.message = 'Successfully!'
               response.data = profile

               const accessToken = this.auth.createJWT(profile)
               const tokenName = this.apiConfig.system.token_name

               res.cookie(tokenName, accessToken, {
                  httpOnly: true,
                  sameSite: 'lax',
               })
            } else {
               response.message = `username and password are not matched or "${username}" is not existed in database!`
               response.errors.push({
                  message: response.message,
               })
            }
         })
         .catch((errors) => response.errors.push({ message: errors }))

      if (this.apiConfig.system.node_env !== 'production') {
         this.logger.log(req.method, `${AuthResolver.name}:logIn`)
         this.logger.log(response, `${AuthResolver.name}:logIn`)
      }

      return response
   }

   @Query(() => Response)
   async logOut(@Context() { req, res }: IContext) {
      const tokenName = this.apiConfig.system.token_name
      const response: Response = {
         action: 'logOut',
         isSuccess: true,
         message: `Success`,
         data: null,
         errors: [],
      }

      res.cookie(tokenName, 'null', {
         httpOnly: true,
         sameSite: 'lax',
         maxAge: 0,
      })

      if (this.apiConfig.system.node_env !== 'production') {
         this.logger.log(req.method, `${AuthResolver.name}:logOut`)
         this.logger.log(response, `${AuthResolver.name}:logOut`)
      }

      return response
   }
}
