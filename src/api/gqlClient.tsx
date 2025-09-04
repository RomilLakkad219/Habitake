import { GraphQLClient } from "graphql-request";

const endpoint = "https://ekri4d3yerhjlagvnfw2k3wngy.appsync-api.eu-central-1.amazonaws.com/graphql";

const graphQlClient = new GraphQLClient(endpoint, {
  headers: {
    "x-api-key": "da2-2hbohuwvkbdudnntmbr3hnx2wu",  // replace with your key
  },
});

export default graphQlClient