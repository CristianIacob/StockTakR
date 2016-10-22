import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { StockList } from "../../app/shared/StockList";
import { StockItemPage } from "../stock-item/stock-item";
import { PopoverPage } from './PopoverPage';

@Component({
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  stockList: StockList;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.stockList = navParams.get('item');
  }

  newItemPage() {
    this.navCtrl.push(StockItemPage, {
      item: this.navParams.get('item')
    });
  }

  itemTapped(item) {
    this.navCtrl.push(StockItemPage, { item: item });
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      stockName: this.selectedItem.title
    });
    popover.present({
      ev: myEvent
    });

  }

  viewItemDetails(itemCode) {
    this.navCtrl.push(NewItem, {
      item: this.navParams.get('item')
    });
  }
}
