import Router from "koa-router";
import {Context} from "koa";

class UserController {

  /**
   * Create the routes.
   *
   * @class UserController
   * @method create
   * @static
   */
  public static create(router: Router) {
    const userController = new UserController();
    router.post("/user", userController.create);
    router.post("/user/auth", userController.logIn);
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

export default UserController;
