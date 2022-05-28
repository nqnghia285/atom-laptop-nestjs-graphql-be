import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { ApiConfigService } from '@libs/api-config'
import { IncomingMessage } from 'http'

type CookiesInRequest = { cookies: { [key: string]: string } }

export type IRequest = IncomingMessage & CookiesInRequest

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private apiConfig: ApiConfigService) {
      super({
         ignoreExpiration: false,
         secretOrKey: apiConfig.system.jwt_key,
         jwtFromRequest: (req: Request | IRequest) => {
            if (req?.headers?.authorization) {
               if (req.headers.authorization.startsWith('Bearer ')) {
                  return req.headers.authorization.split(' ')[1]
               } else {
                  return req.headers.authorization
               }
            } else if (
               req?.cookies &&
               req.cookies[apiConfig.system.token_name]
            ) {
               return req.cookies[apiConfig.system.token_name]
            }

            return null
         },
      })
   }

   validate(payload: any) {
      return payload
   }
}
