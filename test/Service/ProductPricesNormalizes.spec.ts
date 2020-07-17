import 'reflect-metadata'
import {expect} from 'chai';
import ProductPricesNormalizer from "../../src/Service/ProductPricesNormalizer";
import Axios from "axios";
import Sinon, {SinonStubStatic} from "sinon";


describe(ProductPricesNormalizer.name, () => {

    let product = {
        sourceCurrency: 'RON',
        sourcePrice: 1,
        sourceLink: '',
        description: '',
        targetCurrency: 'USD',
        targetPrice: 3,
        targetLink: ''
    }

    it('Should convert usd to ron.', () => {

        return new ProductPricesNormalizer().normalize({
            sourceCurrency: 'RON',
            sourcePrice: 1,
            sourceLink: '',
            description: '',
            targetCurrency: 'USD',
            targetPrice: 3,
            targetLink: ''
        }).then((res) => {
            expect(Math.round(res.sourcePrice * 10) / 10).to.eq(0.2);
            expect(res.sourceCurrency).to.eq("USD");
        })
    });

    it('should cache rates for multiple calls', () => {
        Axios.get = Sinon.stub().resolves({data: {rates: {'RON': 1}}})

        let productPricesNormalizer = new ProductPricesNormalizer()

        return  productPricesNormalizer.normalize({...product}).then(() => {
             return  productPricesNormalizer.normalize(product)
        }).then(() => {
            expect((Axios.get as any).getCalls().length).to.eq(1);
        })
    })
});
