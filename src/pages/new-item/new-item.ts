import {Component} from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { BarcodeScanner, Geolocation } from 'ionic-native';

@Component({
  templateUrl: 'new-item.html'
})
export class NewItem {
  code: string;
  geolocation: string;
  stockName: string;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams) {
    this.stockName = navParams.get('item').title;
  }

  scanImage() {
    BarcodeScanner.scan().then((barcodeData) => {
      console.log('Success');
      this.code = barcodeData.text;
      alert(barcodeData.text);
    }, (err) => {
      console.log('error:', err);
    });

  }

  getGeolocation() {
    alert('get geolocation');

    if ("geolocation" in navigator) {
      alert('geolocation available');
    } else {
      alert('geolocation not available');
    }

    var PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    // presentLoading();
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
      // localStorage.setItem(this.navParams.get('item').title, JSON.stringify(itemInfo));
    } else {
      newStockItems = [info];
      // localStorage.setItem(this.navParams.get('item').title, JSON.stringify([info]));
    }
    localStorage.setItem(this.stockName, JSON.stringify(newStockItems));
    this.navCtrl.pop();
  }

  // presentLoading() {
  //   let loader = this.loadingCtrl.create({
  //     content: "Please wait...",
  //     duration: 10000
  //   });
  //   loader.present();
  // }

}
