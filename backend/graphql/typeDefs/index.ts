import "graphql-import-node";

import * as TaskTypes from "./task.graphql";

import TaskResolvers from "../resolvers/task.resolver";

const root = `
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
  type Subscription {
    root: String
  }
`;

export let typeDefs = [root, TaskTypes];

export let resolvers = [TaskResolvers];
