import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { StockList } from "../../app/shared/StockList";
import { StockItemPage } from "../stock-item/stock-item";
import { PopoverPage } from './PopoverPage';
import { StockItem } from "../../app/shared/StockItem";

@Component({
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  stockList: StockList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.stockList = navParams.get('item');
  }

  newItemPage() {
    this.navCtrl.push(StockItemPage, {
      item: this.navParams.get('item')
    });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      stockName: this.stockList.name
    });
    popover.present({
      ev: myEvent
    });

  }

  viewItemDetails(item) {
    this.navCtrl.push(StockItemPage, { item: item });
  }
}
