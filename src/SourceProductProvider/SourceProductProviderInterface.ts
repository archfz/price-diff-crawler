import SourceProductInterface from "../Model/SourceProductInterface";

export default interface SourceProductProviderInterface {
  /**
   * Get products in batch.
   *
   * @return
   *    Returns true to signify that no more batches are available.
   */
  getProductsBatch(): Promise<SourceProductInterface[] | true>;
}
