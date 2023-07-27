const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const users = [
  {
    userid: "1",
    username: "pradeep",
    userbio: "Hello,dude",
    followers: "1",
    following: "2",
  },
];

const UserDetails = new GraphQLObjectType({
  name: "userdetails",
  fields: () => ({
    userid: { type: GraphQLString },
    username: { type: GraphQLString },
    userbio: { type: GraphQLString },
    followers: { type: GraphQLString },
    following: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "root",
  fields: {
  
  
    user: {                                                           //query for get particular user details
      type: UserDetails,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(users, { userid: args.id });
      },
    },
    
    
    
    users:{                                                             //query for get all user details
        type:new graphql.GraphQLList(UserDetails),
        resolve(parent,args){
            return users
        }
    }
  },
});



module.exports = new GraphQLSchema({
  query: RootQuery,
});
