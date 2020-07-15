import {Container, interfaces} from "inversify";
import SourceProductProviderInterface from "./SourceProductProvider/SourceProductProviderInterface";
import EmagLaptopsSourceProvider from "./SourceProductProvider/EmagLaptopsSourceProvider";
import ProductsCrawler from "./Service/ProductsCrawler";
import ChromeClientFactory from "./Service/ChromeClientFactory";
import {constants} from "./constants";

const container = new Container();

container.bind('factory:chrome_client').to(ChromeClientFactory);

container.bind('source_provider:emag:laptop').to(EmagLaptopsSourceProvider);

container.bind<interfaces.Factory<SourceProductProviderInterface>>('Factory<SourceProductProvider>')
  .toFactory<SourceProductProviderInterface>((context: interfaces.Context) => {
    return (type: string) => {
      switch (type) {
        case constants.SOURCE_PRODUCT_PROVIDERS.EMAG_LAPTOPS:
          return context.container.get('source_provider:emag:laptop');
        default:
          throw new Error(`'${type}' source product provider does not exist. Possible types are: ` + Object.values(constants.SOURCE_PRODUCT_PROVIDERS).join(', '));
      }
    };
  });

container.bind('products:crawler').to(ProductsCrawler);

export default container;
