import { DefaultApi } from "./GeneratedApi/apis/DefaultApi";
import { Configuration } from "./GeneratedApi/runtime";

export class Api extends DefaultApi {
  private static instance: Api;
  private constructor(configuration: Configuration) {
    super();
    this.configuration = configuration;
  }
  getInstance(configuration: Configuration) {
    if (!Api.instance) {
      Api.instance = new Api(configuration);
    }
    return Api.instance;
  }
  changeConfig(configuration: Configuration) {
    this.configuration = configuration;
  }
}
