import FinalProductInterface from "../Model/FinalProductInterface";

export default class ProductRepository {
  public save(product: FinalProductInterface): Promise<any> {
    // @TODO: Implement.
    return Promise.resolve();
  }

  public loadBySourceLink(link: string): Promise<FinalProductInterface | null> {
    // @TODO: Implement.
    return Promise.resolve(null);
  }
}

