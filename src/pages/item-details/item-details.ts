import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  stockItems: Array<{code: string, name: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.stockItems = [];
    for(let i = 1; i < 4; i++) {
      this.stockItems.push({
        code: 'Code ' + i,
        name: 'This is item #' + i,
      });
    }
  }


}
