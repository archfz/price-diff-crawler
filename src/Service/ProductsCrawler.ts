import SourceProductProviderInterface from "../SourceProductProvider/SourceProductProviderInterface";
import {inject, injectable, interfaces} from "inversify";

@injectable()
export default class ProductsCrawler {
  protected sourceProductProviderFactory: interfaces.Factory<SourceProductProviderInterface>;

  constructor(@inject('Factory<SourceProductProvider>') sourceProductProviderFactory: interfaces.Factory<SourceProductProviderInterface>) {
    this.sourceProductProviderFactory = sourceProductProviderFactory;
  }


  public findIncorrectlyPricedProducts(type: string, minDiffPercentage: number): Promise<void> {
    let sourceProvider = this.sourceProductProviderFactory(type);
    return (sourceProvider as SourceProductProviderInterface).getProductsBatch()
      .then(() => {});
  }
}
