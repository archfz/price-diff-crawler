import SourceProductInterface from "../Model/SourceProductInterface";
import TargetProductInterface from "../Model/TargetProductInterface";
import {injectable} from "inversify";

@injectable()
export default class ProductPricesNormalizer {
  public normalize(product: SourceProductInterface & TargetProductInterface): Promise<SourceProductInterface & TargetProductInterface> {
    // @TODO: Implement.
    return {} as any;
  }
}
