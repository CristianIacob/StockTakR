import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';


// import * as cxml from 'cxml';
// import * as example from 'cxml/test/xmlns/dir-example';


@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Stock ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }



    // var parser = new cxml.Parser();
    // var result = parser.parse('<dir name="empty"></dir>', example.document);

    // result.then((doc: example.document) => {
    //     console.log(JSON.stringify(doc));
    // });

  }

  itemTapped(event, item) {
   alert("test");
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}
