import { GraphQLRequestContext, GraphQLResponse } from 'apollo-server-types';
// import { Response } from '~/graphql/typedefs';

export function formatResponse(
   response: GraphQLResponse,
   requestContext: GraphQLRequestContext<object>
): GraphQLResponse {
   // if (response.data) {
   //    const data = { ...response.data }
   //    if (Object.keys(data)[0] !== 'logIn' && Object.keys(data)[0] !== 'logOut') {
   //       const entries = Object.entries(data)
   //       response.data = {
   //          [entries[0][0]]: {
   //             action: entries[0][0],
   //             errors: [],
   //             data: entries[0][1],
   //             isSuccess: true,
   //             message: 'Success'
   //          } as Response
   //       }
   //    }
   // }

   return response
}
