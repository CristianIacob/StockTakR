import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { StockItem } from "../../app/shared/StockItem";
import { PersistenceApi } from "../../app/shared/persistence.service";

import { BarcodeScanner, Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'stock-item.html'
})
export class StockItemPage {
  stockName: string;
  stockItem: StockItem = new StockItem(null, null, null, null, null);
  timeout: number = 10000;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private dataService: PersistenceApi) {

    this.stockName = navParams.get('stockName');
    if(navParams.get('item')) {
      this.stockItem = navParams.get('item');
    }
  }

  scanImage() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.stockItem.barcode = barcodeData.text;
    }, (err) => {
      console.log('An error occurred while trying to read the barcode', err);
    });
  }

  getGeolocation() {
    var PositionOptions = { enableHighAccuracy: true, timeout: this.timeout, maximumAge: 0 };

    this.presentLoading();
    Geolocation.getCurrentPosition(PositionOptions).then((resp) => {
      var location = resp.coords.latitude + ' , ' + resp.coords.longitude;
      this.stockItem.location = location;
    }, (err) => {
      console.log('An error occurred while trying to get the location', err);
    });
  }

  saveItem() {
    var newStockItem = new StockItem(this.stockItem.barcode, this.stockItem.location, this.stockItem.quantity, this.stockItem.name, this.stockItem.comments);
    this.dataService.getStockList(this.stockName)
      .then(stockItems => {
        stockItems[this.stockItem.barcode] = newStockItem;
        console.log('stockItems: ', stockItems);
        this.dataService.setStockList(this.stockName, stockItems);
      })
      .then(() => this.navCtrl.pop());
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: this.timeout
    });
    loader.present();
  }
}
