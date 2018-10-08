import Koa, {Context} from "koa";


/**
 * The caching engine.
 *
 * @class Cacher
 */
class Cacher {

  
  private caches: any = {};
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Koa.Middleware {
    let cachingEngine = new Cacher();
    return (ctx: Context, next: () => Promise<any>) => {
      return cachingEngine.attach(ctx, next);
    }
  }

  /**
   * Constructor.
   *
   * @class Cacher
   * @constructor
   */
  constructor() {}


  public attach(ctx: any, next: () => Promise<any>):Promise<any> { 
    console.log("Caching engine started");
    ctx.cacher = this;
    return next();
  }


  public setItem(name: string, id: string, obj: any): void {
    if(!this.caches[name])
    this.caches[name] = {};

    this.caches[name][id] = obj;
  }

  public getItem(name: string, id: string): any {
    if(!this.caches[name]) return false;
    if(!this.caches[name][id]) return false;

    console.log("Loaded from cache");
    return this.caches[name][id];
  }



}

export default Cacher;

