import { Controller, Get, Response } from '@nestjs/common'
import { CheckPoliciesGuardForRestApi } from '~/decorators'
import { ActionCreator } from '~/guards'
import { GraphQLSchemaService } from './graphql-schema.service'

@Controller('graphql-schema')
export class GraphQLSchemaController {
   constructor(private readonly graphQLSchema: GraphQLSchemaService) {}

   @Get()
   @CheckPoliciesGuardForRestApi(ActionCreator('FIND_FIRST', 'Schema'))
   getGraphQLSchema(@Response({ passthrough: true }) res) {
      res.set({
         'Content-Type': 'application/octet-stream',
         'Content-Disposition': 'attachment; filename="schema.gql"',
      })

      return this.graphQLSchema.getGraphQLSchema()
   }
}
