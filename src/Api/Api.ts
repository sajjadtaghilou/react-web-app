// import { DefaultApi } from "./GeneratedApi/apis/DefaultApi";
// import { Configuration } from "./GeneratedApi/runtime";

import { Configuration, DefaultApi } from "./GeneratedApi";
import { setBearerAuthToObject } from "./GeneratedApi/common";

class Api extends DefaultApi {
  private static instance: Api;
  private constructor(configuration: Configuration) {
    super(configuration);
    this.configuration = configuration;
  }
  static getInstance() {
    if (!Api.instance) {
      Api.instance = new Api(
        new Configuration({ basePath: process.env.REACT_APP_API_SERVER })
      );
    }
    return Api.instance;
  }
  async changeConfig(configuration: Configuration) {
    configuration.basePath = this.configuration?.basePath;
    const headers = {};
    await setBearerAuthToObject(headers, configuration);
    configuration.baseOptions = { headers };
    console.log({ configuration });
    this.configuration = configuration;
  }
}

export const api = Api.getInstance();
