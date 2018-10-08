import Router from "koa-router";
import { buildSchema } from 'graphql';
import Schema from './Schema';
import Resolvers from './resolvers/UserResolver';
const graphqlHTTP = require('koa-graphql');

class GraphQLMiddleware {

  private router: Router;
  /**
   * Create the routes.
   *
   * @class GraphQLMiddleware
   * @method create
   * @static
   */
  public static create(router: Router) {
    return new GraphQLMiddleware(router);
  }

  /**
   * Constructor
   *
   * @class GraphQLMiddleware
   * @constructor
   */
  constructor(router: Router) {
    this.router = router;
    this.mount();
  }

  public schema() {
    return buildSchema(Schema);
  }

  public resolvers() {
    return Resolvers;
  }

  /**
   * The home page route.
   *
   * @class GraphQLMiddleware
   * @method run
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public mount(): void {
    this.router.all('/', graphqlHTTP({
      graphiql: true,
      schema: this.schema(),
      rootValue: this.resolvers(),
    }));
  }
}

export default GraphQLMiddleware;
