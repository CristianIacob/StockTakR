import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { PersistenceApi } from "../../app/shared/persistence.service";
// import { StockList } from "../../app/shared/StockList";
import { StockItem } from  "../../app/shared/StockItem";

@Component({
    templateUrl: 'list.html'
})
export class ListPage {
    // stockLists: StockList[] = [];
    stockLists: any = [];
    stockItems: StockItem[] = [];

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController,
        private dataService: PersistenceApi) { }

    addStockList() {
        let alert = this.alertCtrl.create({
            title: 'Add stock',
            inputs: [{ name: 'stockName', placeholder: 'Stock name' }],
            buttons: [
                {
                    text: 'Add', role: 'Add',
                    handler: data => {
                        // var stockList: StockList = new StockList(data.stockName, null);
                        // this.stockLists.push(stockList);
                        // this.dataService.setStockList(this.stockLists);
                      this.stockLists.push(data.stockName);
                      this.dataService.setStockList(data.stockName, {});
                    }
                },
                {
                    text: 'Cancel', role: 'Cancel',
                    handler: data => { console.log('Cancel clicked'); }
                }
            ]
        });
        alert.present();
    }


    ionViewWillEnter() {
        // this.dataService.getStockList().then(data => {
        //     if (data) {
        //         this.stockLists = data;
        //     }
        // });
      this.dataService.getStocks();
      this.stockLists = this.dataService.getAllStocks();
      console.log('stockList: ', this.stockLists);
    }

    itemTapped(stock) {
        this.navCtrl.push(ItemDetailsPage, { stock: stock });
    }
}
