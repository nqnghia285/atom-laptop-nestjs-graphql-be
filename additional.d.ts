/// <reference types="graphql-upload" />
import GRAPHQL_MULTIPART_REQUEST_SPEC_URL from './node_modules/graphql-upload/GRAPHQL_MULTIPART_REQUEST_SPEC_URL'
import GraphQLUpload from './node_modules/graphql-upload/GraphQLUpload'
import Upload from './node_modules/graphql-upload/Upload'
import graphqlUploadExpress from './node_modules/graphql-upload/graphqlUploadExpress'
import graphqlUploadKoa from './node_modules/graphql-upload/graphqlUploadKoa'
import ignoreStream from './node_modules/graphql-upload/ignoreStream'
import processRequest from './node_modules/graphql-upload/processRequest'

export default {
   GRAPHQL_MULTIPART_REQUEST_SPEC_URL,
   GraphQLUpload,
   Upload,
   graphqlUploadExpress,
   graphqlUploadKoa,
   ignoreStream,
   processRequest
}