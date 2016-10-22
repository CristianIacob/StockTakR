import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { StockItem } from "../../app/shared/StockItem";

import { BarcodeScanner, Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'stock-item.html'
})
export class StockItemPage {

  stockItem: StockItem;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams) {
    this.stockItem = navParams.get('item');
  }

  scanImage() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.stockItem.barcode = barcodeData.text;
    }, (err) => {
      console.log('An error occurred while trying to read the barcode', err);
    });
  }

  getGeolocation() {
    var PositionOptions = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 };

    Geolocation.getCurrentPosition(PositionOptions).then((resp) => {
      var location = resp.coords.latitude + ' , ' + resp.coords.longitude;
      this.stockItem.location = location;
    }, (err) => {
      console.log('An error occurred while trying to get the location', err);
    });
  }
}
