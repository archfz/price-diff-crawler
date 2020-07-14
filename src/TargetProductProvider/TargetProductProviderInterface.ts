import SourceProductInterface from "../Model/SourceProductInterface";
import TargetProductInterface from "../Model/TargetProductInterface";

export default interface TargetProductProviderInterface {
  getProduct(product: SourceProductInterface): Promise<TargetProductInterface>
}
