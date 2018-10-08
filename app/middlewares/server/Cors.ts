import Koa, {Context} from "koa";

class CorsMiddleware {
    private app: Koa;

    /**
   * Create the routes.
   *
   * @class CorsMiddleware
   * @method create
   * @static
   */
  public static create(app: Koa) {
    return new CorsMiddleware(app);
  }

  /**
   * Constructor
   *
   * @class CorsMiddleware
   * @constructor
   */
  constructor(app: Koa) {
    this.app = app;
    this.app.use(this.run);
  }

  /**
   * The home page route.
   *
   * @class CorsMiddleware
   * @method run
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public run(ctx: Context, next: () => Promise<any>): Promise<any> {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
        ctx.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Content-Type');
        return next();
    }
}

export default CorsMiddleware;
