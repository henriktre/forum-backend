import Router from "koa-router";
import {Context} from "koa";

class GraphQLController {

  /**
   * Create the routes.
   *
   * @class GraphQLController
   * @method create
   * @static
   */
  public static create(router: Router) {
    const graphqlController = new GraphQLController();
    router.post("/graphql", graphqlController.create);
  }

  /**
   * Constructor
   *
   * @class UserController
   * @constructor
   */
  constructor() {}

  /**
   * The home page route.
   *
   * @class UserController
   * @method logIn
   */
  public logIn(ctx: Context) {
    ctx.body = {
      user: "Logging in user",
    };
  }


  public create(ctx: Context) {
    ctx.body = {
      user: "Create user",
    };
  }
}

export default GraphQLController;
