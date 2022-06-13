import { ApiConfigModule } from '@libs/api-config'
import { LoggerModule } from '@libs/logger'
import { PrismaModule } from '@libs/prisma'
import { Module } from '@nestjs/common'
import { ResetAdminAccountController } from './reset-admin-account.controller'
import { ResetAdminAccountService } from './reset-admin-account.service'

@Module({
   imports: [ApiConfigModule, LoggerModule, PrismaModule],
   controllers: [ResetAdminAccountController],
   providers: [ResetAdminAccountService],
   exports: [ResetAdminAccountService],
})
export class ResetAdminAccountModule {}
