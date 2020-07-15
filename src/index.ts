import "reflect-metadata";
import container from "./container";
import commander from "commander";
import ProductsCrawler from "./Service/ProductsCrawler";
import PrettyError from 'pretty-error';

commander.program.command('crawl <type> <percentage>')
  .description('run the crawler for the type of products and alert when given percentage difference reached')
  .action(async (type, percentage) => {
    try {
      await container.get<ProductsCrawler>('products:crawler').findIncorrectlyPricedProducts(type, percentage);
    } catch (error) {
      console.error(new PrettyError().render(error));
      process.exit(1);
    }
  });

commander.program.parse(process.argv);
