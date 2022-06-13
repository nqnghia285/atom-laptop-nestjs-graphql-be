import { Module } from '@nestjs/common'
import { GraphQLSchemaModule } from './graphql-schema'
import { ResetAdminAccountModule } from './reset-admin-account'

@Module({
   imports: [GraphQLSchemaModule, ResetAdminAccountModule],
   exports: [GraphQLSchemaModule, ResetAdminAccountModule],
})
export class ApiModule {}
