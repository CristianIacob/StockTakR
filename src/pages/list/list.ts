import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { PersistenceApi } from "../../app/shared/persistence.service";
import { StockList } from "../../app/shared/StockList";

@Component({
    templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, icon: string }>;
  stockLists: StockList[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private dataService: PersistenceApi) {
      // If we navigated to this page, we will have an item available as a nav param
      this.selectedItem = navParams.get('item');

      this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
        'american-football', 'boat', 'bluetooth', 'build'];

      this.items = [];

      if (localStorage.length > 0) {
        for (var stockName in localStorage) {
          this.items.push({
            title: stockName,
            icon: this.icons[Math.floor(Math.random() * this.icons.length)]
          });
        }
      }
    }

    itemTapped(event, item) {
        this.navCtrl.push(ItemDetailsPage, {
            item: item
        });
    }

    addStock(event) {
        this.presentPrompt();
    }

    presentPrompt() {
        let alert = this.alertCtrl.create({
            title: 'Add stock',
            inputs: [
                {
                    name: 'stockName',
                    placeholder: 'Stock name'
                }
            ],
            buttons: [
                {
                    text: 'Add',
                    role: 'Add',
                    handler: data => {
                        this.items.push({
                            title: data.stockName,
                            icon: this.icons[Math.floor(Math.random() * this.icons.length)]
                        });
                        localStorage.setItem(data.stockName,"[]");
                    }
                },
                {
                    text: 'Cancel',
                    role: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    }

  ionViewDidLoad() {
    this.dataService.getStockList().then(data => {
      this.stockLists = data;
      console.log(data);
    });
  }
}
