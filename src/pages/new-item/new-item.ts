import {Component} from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { BarcodeScanner, Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'new-item.html'
})
export class NewItem {
  code: string;
  geolocation: string;
  itemName: string;
  comments: string;
  quantity: number;
  stockName: string;
  timeout: number = 10000;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams) {
    this.stockName = navParams.get('item').title;
  }

  scanImage() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.code = barcodeData.text;
      alert(barcodeData.text);
    }, (err) => {
      alert('error:' + err);
    });
  }

  getGeolocation() {
    // if ("geolocation" in navigator) {
    //   alert('geolocation available');
    // } else {
    //   alert('geolocation not available');
    // }

    var PositionOptions = {
      enableHighAccuracy: true,
      timeout: this.timeout,
      maximumAge: 0
    };

    this.presentLoading();
    Geolocation.getCurrentPosition(PositionOptions).then((resp) => {
      this.geolocation = resp.coords.latitude + ' , ' + resp.coords.longitude;
      alert('location: ' + this.geolocation);

    }).catch((error) => {
      alert('Error getting location' + error);
    });
  }

  saveItem() {
    var info = {
      code: this.code,
      location: this.geolocation
    };

    var newStockItems;
    var localStorageStock = localStorage.getItem(this.stockName);
    if(localStorageStock !== null) {
      var itemInfo = JSON.parse(localStorageStock);
      itemInfo.push(info);
      newStockItems = itemInfo;
    } else {
      newStockItems = [info];
    }
    localStorage.setItem(this.stockName, JSON.stringify(newStockItems));
    this.navCtrl.pop();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: this.timeout
    });
    loader.present();
  }

}
