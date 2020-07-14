import SourceProductProviderInterface from "./SourceProductProviderInterface";
import SourceProductInterface from "../Model/SourceProductInterface";

export default class EmagLaptopsSourceProvider implements SourceProductProviderInterface {
  getProductsBatch(): Promise<SourceProductInterface[] | true> {
    // @TODO: Implement.
    return Promise.resolve(true);
  }
}
