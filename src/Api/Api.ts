import { Configuration, DefaultApi } from "./GeneratedApi";

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
  changeConfig(configuration: Configuration) {
    configuration.basePath = this.configuration?.basePath;
    this.configuration = configuration;
  }
}

export const api = Api.getInstance();
