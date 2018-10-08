//import { NextFunction, Request, Response, Router } from "express";
//
import Router from "koa-router"
import {Context} from "koa";

class IndexController {

  /**
   * Create the routes.
   *
   * @class IndexController
   * @method create
   * @static
   */
  public static create(router: Router) {
    // //log
    // console.log("[IndexController::create] Creating index route.");

    //add home page route
    router.get("/", new IndexController().index);
  }

  /**
   * Constructor
   *
   * @class IndexController
   * @constructor
   */
  constructor() {}

  /**
   * The home page route.
   *
   * @class IndexController
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(ctx: Context) {
    ctx.body = {
      hello: "WORLD",
    };
    ctx.response.status = 200;
  }
}

export default IndexController;
