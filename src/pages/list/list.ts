import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { PersistenceApi } from "../../app/shared/persistence.service";
import { StockList } from "../../app/shared/StockList";

@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  stockLists: StockList[] = [];

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private dataService: PersistenceApi) {}

  addStockList() {
    let alert = this.alertCtrl.create({
      title: 'Add stock',
      inputs: [{ name: 'stockName', placeholder: 'Stock name' }],
      buttons: [
        {
          text: 'Add', role: 'Add',
          handler: data => {
            var stockList: StockList = new StockList(data.stockName, null);
            this.stockLists.push(stockList);
            this.dataService.setStockList(this.stockLists);
          }
        },
        {
          text: 'Cancel', role: 'Cancel',
          handler: data => {console.log('Cancel clicked');}
        }
      ]
    });
    alert.present();
  }


  ionViewWillEnter() {
    this.dataService.getStockList().then(data => {
      this.stockLists = data;
    });
  }

  itemTapped(item) {
    this.navCtrl.push(ItemDetailsPage, { item: item });
  }
}
