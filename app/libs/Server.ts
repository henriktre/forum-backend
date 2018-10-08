//import bodyParser from "koa-bodyparser";
//
import Koa from "koa";
import Router from "koa-router";
import logger from "koa-morgan";
import * as middlewares from '../middlewares/server';
import * as controllers from '../controllers';
import Boom from "boom";
import GraphQL from '../middlewares/graphql/GraphQL';

const bodyParser = require('koa-bodyparser');
const errorHandler = require('koa-error');
const jwt = require('koa-jwt');


interface Middleware {
  create(app: Koa):void
}

// import path from "path";


/**
 * The server.
 *
 * @class Server
 */
class Server {

  public app: Koa;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    this.app = new Koa();

    this.config();

    this.middlewares();

    this.routes();
  }



  public middlewares(): void {
    (<any>Object).values(middlewares).map((middleware:Middleware) => middleware.create(this.app));
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config(): void {
    //use logger middlware
    this.app.use(logger("dev"));

    //use json form parser middlware
    this.app.use(bodyParser());
    
    // add JWT middleware
    this.app.use(jwt({secret: 'mysecret', passthrough: true}));
    // catch 404 and forward to error handler
    //this.app.use((ctx, next) => {
      //ctx.response.status = 404;
      //ctx.body = Boom.notFound(`Page with path ${ctx.path} not found`).output;
      //return next();
    //});

    //error handling
    this.app.use(errorHandler());
  }


  /**
   * Create router
   *
   * @class Server
   * @method api
   */
  public routes(): void {
    const router: Router = new Router();
    const allowedMethods = {
      throw: true,
      notImplemented: Boom.notImplemented,
      methodNotAllowed: Boom.methodNotAllowed,
    };
    // Register api routes
    this.api(router, allowedMethods);
    this.graphQL(router)
    this.app.use(router.allowedMethods(allowedMethods));

    //use router middleware
    this.app.use(router.routes());
  }
  

  /**
   * Initialize the graphQL middleware
   *
   * @class Server
   * @method api
   * @param router {Router}
   */
  public graphQL(router: Router): void {
    const graphQLRouter: Router = new Router();
    GraphQL.create(graphQLRouter);
    router.use('/api/graphql', graphQLRouter.routes(), graphQLRouter.allowedMethods());
  }
  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   * @param router {Router}
   */
  public api(router: Router, allowedMethods: object): void {
    const apiRouter: Router = new Router();

    (<any>Object).values(controllers).map((controller: any) => controller.create(apiRouter));

    router.use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods(allowedMethods));
  }
}

export default Server;
