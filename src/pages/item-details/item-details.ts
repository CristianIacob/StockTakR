import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { PersistenceApi } from "../../app/shared/persistence.service";

// import { StockList } from "../../app/shared/StockList";
import { StockItem } from  "../../app/shared/StockItem";
import { StockItemPage } from "../stock-item/stock-item";
import { PopoverPage } from './PopoverPage';

@Component({
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  stockItems: {};
  stockListKeys: string[] = [];
  stockName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private dataService: PersistenceApi) {

    this.stockName = navParams.get('stock');
  }

  newItemPage() {
    this.navCtrl.push(StockItemPage, {
      stockName: this.stockName
    });
  }

  // To do
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      stockName: this.stockName
    });
    popover.present({
      ev: myEvent
    });

  }

  viewItemDetails(item) {
    this.navCtrl.push(StockItemPage, {
      stockName: this.stockName,
      item: item
    });
  }

  ionViewWillEnter() {
    this.dataService.getStockList(this.stockName)
      .then(stockItems => {
        this.stockItems = stockItems;
        this.stockListKeys = Object.keys(this.stockItems);
      })
      .catch(err => console.log('Error getting stock items!'));
  }
}
