import { Controller, Get } from '@nestjs/common'
import { ResetAdminAccountService } from './reset-admin-account.service'

@Controller('reset-admin-account')
export class ResetAdminAccountController {
   constructor(private readonly resetAdminAccountService: ResetAdminAccountService) {}

   @Get()
   resetAdminAccount() {
      return this.resetAdminAccountService.resetAdminAccount()
   }
}
