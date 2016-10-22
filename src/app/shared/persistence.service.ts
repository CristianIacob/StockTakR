import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { StockList } from "./StockList";
import { StockItem } from "./StockItem";

@Injectable()
export class PersistenceApi {
  local = new Storage();

  constructor() {
    this.getStockList().then(data => {
      if (data === null || data == undefined) {
        this.init();
      }
    });
  }

  setStockList(data: StockList[]) {
    this.local.set('data', data);
  }

  getStockList() {
    return this.local.get('data');
  }

  init() {
    console.log('No Stock Lists Found... Creating...');

    var l1_i1: StockItem = new StockItem('l1_i1', 'location');
    var l1_i2: StockItem = new StockItem('l1_i2', 'location');
    var l2_i1: StockItem = new StockItem('l2_i1', 'location');
    var l2_i2: StockItem = new StockItem('l2_i2', 'location');

    var stockLists: StockList[] = [
      new StockList('list1', [l1_i1, l1_i2]),
      new StockList('list2', [l2_i1, l2_i2])
    ];

    this.setStockList(stockLists);
  }
}
