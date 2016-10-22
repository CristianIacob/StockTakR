import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { NewItem } from '../new-item/new-item';
import { PopoverPage } from './PopoverPage';


@Component({
    templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
    selectedItem: any;
    stockItems: Array<{ code: string, name: string }>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        console.log('again: ', localStorage);
    }

    ionViewWillEnter() {
        alert("ionViewEnter Test");
        this.stockItems = [];

        if (localStorage.getItem(this.selectedItem.title) !== null) {
            var info = JSON.parse(localStorage.getItem(this.selectedItem.title));
            for (var i = 0; i < info.length; i++) {
                var item = info[i];
                this.stockItems.push({
                    code: 'Code ' + item.code,
                    name: 'Loc: ' + item.location
                });
            }
        }
    }

    newItemPage() {
        this.navCtrl.push(NewItem, {
            item: this.navParams.get('item')
        });
    }

    itemTapped(event, item) {
        alert('taped');
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage, {
            stockName: this.selectedItem.title
        });
        popover.present({
            ev: myEvent
        });

    }
}
