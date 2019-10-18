import { page } from './page';
import { Section } from './Section';
import { Query } from './Query'
import { Subscription } from './Subscription'
import { auth } from './Mutation/auth'
import { post } from './Mutation/post'
import { User } from './User'
import { Post } from './Post'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';

export default {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,
  Query,
  Mutation: {
    ...auth,
    ...post,
    
  },
  Subscription,
  User,
  Post,
  // Section,
  ...page
}
