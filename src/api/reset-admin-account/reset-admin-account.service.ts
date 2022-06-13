import { ApiConfigService } from '@libs/api-config'
import { LoggerService } from '@libs/logger'
import { PrismaService } from '@libs/prisma'
import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class ResetAdminAccountService {
   constructor(
      private readonly config: ApiConfigService,
      private readonly prisma: PrismaService,
      private readonly logger: LoggerService
   ) {}
   
   async resetAdminAccount() {
      const admin = await this.prisma.user.findFirst({
         where: {
            profile: {
               OR: [
                  { email: this.config.system.email },
                  { phone: this.config.system.phone }
               ]
            }
         },
      })

      if (admin) {
         await this.prisma.user.delete({
            where: {
               id: admin.id
            }
         })

         await this.prisma.person.delete({
            where: {
               id: admin.id
            }
         })
      }

      return await this.prisma.user.create({
         data: {
            profile: {
               create: {
                  fullname: this.config.system.fullname,
                  phone: this.config.system.phone,
                  email: this.config.system.email,
               },
            },
            password: bcrypt.hashSync(
               this.config.system.password,
               bcrypt.genSaltSync(10)
            ),
            role: 'ADMIN',
         },
         select: {
            id: true,
            profile: true,
            role: true,
            posts: true,
            password: true,
            createdAt: true,
            updatedAt: true,
            _count: true,
         },
      })
         .then((user) => {
            this.logger.log(user, 'Reseted Admin Account')
            return `
               <!DOCTYPE html>
               <html lang="en">
               <body style="align-items: center;">
                  <h1>Reseted Admin Account</h1>
                  <ul>
                     <li>Email: ${this.config.system.email}</li>
                     <li>Password: ${this.config.system.password}</li>
                  </ul>
               </body>
               </html>
            `
         })
         .catch((err) => {
            this.logger.log(err, 'Error')
            return `<h1>${JSON.stringify(err)}<h1>`
         })  
   }
}
