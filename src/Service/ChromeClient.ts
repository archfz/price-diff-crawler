import {WebDriver} from "selenium-webdriver";

export default class ChromeClient {
  public driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  public close(): Promise<any> {
    return this.driver.quit();
  }

}
