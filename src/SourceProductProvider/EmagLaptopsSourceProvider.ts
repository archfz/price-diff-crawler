import SourceProductProviderInterface from "./SourceProductProviderInterface";
import SourceProductInterface from "../Model/SourceProductInterface";
import ChromeClientFactory from "../Service/ChromeClientFactory";
import {inject, injectable} from "inversify";

@injectable()
export default class EmagLaptopsSourceProvider implements SourceProductProviderInterface {
  protected clientFactory: ChromeClientFactory;

  constructor(@inject('factory:chrome_client') chromeClientFactory: ChromeClientFactory) {
    this.clientFactory = chromeClientFactory;
  }

  getProductsBatch(): Promise<SourceProductInterface[] | true> {
    return this.clientFactory.create('https://emag.ro')
      .then(async (client) => {
        await client.driver.sleep(10000);
        return [];
      });
  }
}
