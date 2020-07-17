import SourceProductInterface from "../Model/SourceProductInterface";
import TargetProductInterface from "../Model/TargetProductInterface";
import {injectable} from "inversify";
import Axios from "axios";


@injectable()
export default class ProductPricesNormalizer {
    private rates: Record<string, number> | null = null

    public normalize(product: SourceProductInterface & TargetProductInterface): Promise<SourceProductInterface & TargetProductInterface> {
        // @TODO: Implement.
        if (product.sourceCurrency === product.targetCurrency) {
            return Promise.resolve(product)
        }
        if (!this.rates) {
            return this.getRates(product.sourceCurrency).then((res) => {
                this.rates = res.data.rates;
                return this.normalizeProduct(product, this.rates as Record<string, number>)
            })
        }
        return Promise.resolve(this.normalizeProduct(product, this.rates))
    }

    private getRates(sourceCurrency: string): Promise<any> {
        return Axios.get('https://api.exchangeratesapi.io/latest?base=' + sourceCurrency)
    }

    private normalizeProduct(product: SourceProductInterface & TargetProductInterface, rates: Record<string, number>) {
        product.sourcePrice = product.sourcePrice * rates[product.targetCurrency];
        product.sourceCurrency = product.targetCurrency
        return product
    }

}
