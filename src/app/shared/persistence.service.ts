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

}
