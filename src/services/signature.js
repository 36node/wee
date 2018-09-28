import API from "../api/signature";
import Wechat from "wechat-jssdk";

const wx = new Wechat({
  appId: "wxc6e9cb897b597861",
  appSecret: "22e7e10701eb1d37ceb790cfd680ac9f",
});

export class Service extends API {
  /**
   * Get a signature
   *
   * @abstract
   * @param {GetSignatureRequest} req getSignature request
   * @returns {GetSignatureResponse} A valid signature
   */
  async getSignature(req) {
    const { url } = req;
    const body = await wx.jssdk.getSignature(decodeURIComponent(url));
    return { body };
  }
}

const service = new Service();
export default service;
