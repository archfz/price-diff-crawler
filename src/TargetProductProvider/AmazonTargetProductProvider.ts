import TargetProductProviderInterface from "./TargetProductProviderInterface";
import SourceProductInterface from "../Model/SourceProductInterface";
import TargetProductInterface from "../Model/TargetProductInterface";

export default class AmazonTargetProductProvider implements TargetProductProviderInterface {
  getProduct(product: SourceProductInterface): Promise<TargetProductInterface> {
    // @TODO: Implement.
    return Promise.resolve({} as any);
  }
}
