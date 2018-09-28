/// <reference path='./def.d.ts' />
import createError from "http-errors";

export default class API {
  /**
   * Bind service to router
   *
   * @param {Object} router the koa compatible router
   */
  bind(router) {
    const getSignature = async ctx => {
      if (!ctx.params.url) throw createError(400, "url in path is required.");

      const req = {
        url: ctx.params.url,
        context: ctx, // here we put koa context in request
      };

      const res = await this.getSignature(req);

      if (!res.body) throw createError(500, "should have body in response");

      ctx.body = res.body;
      ctx.status = 200;
    };

    router.get("/signatures/:url", this.authorize("getSignature"), getSignature);
  }

  /**
   * implement following abstract methods in the inherited class
   */

  /**
   * Authorize current operation
   * rewrite it if you want to control operation permission
   *
   * @param {string} operation name of operation
   */
  authorize(operation) {
    return (ctx, next) => {
      return next();
    };
  }

  /**
   * Get a signature
   *
   * @abstract
   * @param {GetSignatureRequest} req getSignature request
   * @returns {GetSignatureResponse} A valid signature
   */
  getSignature(req) {
    throw new Error("not implemented");
  }
}
