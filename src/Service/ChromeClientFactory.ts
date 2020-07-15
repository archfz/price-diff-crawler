import ChromeClient from "./ChromeClient";
import {constants} from "../constants";
import {Builder,  WebDriver} from "selenium-webdriver";
import Chrome from 'selenium-webdriver/chrome';
import os from 'os';
import {injectable} from "inversify";
const PrettyError = require('pretty-error');
const pe = new PrettyError();

@injectable()
export default class ChromeClientFactory {
  protected throttle: Promise<any> = Promise.resolve();

  public create(url: string): Promise<ChromeClient> {
    let actualDriver: WebDriver;

    return this.throttleBrowser().then(async () => {
      return new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new Chrome.Options()
          .addArguments(`user-data-dir=${os.homedir()}/.config/google-chrome/Default`)
          .addArguments(`disable-popup-blocking`))
        .build();

    }).then((driver) => {
      actualDriver = driver;
      return driver.get(url);
    }).then(() => {
      return new ChromeClient(actualDriver);
    }).catch((error) => {
      console.error(pe.render(error));

      if (error.message.indexOf('user data directory is already in use') !== -1) {
        throw new Error("Please close existing automated chrome windows in order to start the script!");
      }

      throw new Error("Browser failed starting");
    });
  }

  protected throttleBrowser(): Promise<any> {
    let previousThrottle = this.throttle;

    this.throttle = new Promise<any>((resolve) => {
      setTimeout(resolve,
        (constants.BROWSER_THROTTLE_MAX_S - constants.BROWSER_THROTTLE_MIN_S) * Math.random()
        + constants.BROWSER_THROTTLE_MIN_S
      );
    });

    return previousThrottle;
  }

}
