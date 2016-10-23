import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class PersistenceApi {
  local = new Storage();

  constructor() {
  }

  setStockList(stockName: string, data: {}) {
    this.local.set(stockName, data);
  }

  getStockList(stockName: string) {
    return this.local.get(stockName);
  }

  getAllStocks() {
    var stocks = [];
    this.local.forEach(function(value, key) {
      stocks.push(key);
    });
    return stocks;
  }

  getStocks() {
    var stocks = {};
    this.local.forEach(function(value, key) {
      console.log('key:', key);
      console.log('value:', value);
      stocks[key] = value;
    });
    console.log("stocks ------->" , stocks)
    return stocks;
  }

}
