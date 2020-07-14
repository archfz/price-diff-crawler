import TargetProductInterface from "./TargetProductInterface";
import SourceProductInterface from "./SourceProductInterface";

export default interface FinalProductInterface extends TargetProductInterface, SourceProductInterface {
  priceDiffPercentage: number;
}
