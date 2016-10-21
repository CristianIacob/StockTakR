import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

@Component({
    templateUrl: 'list.html'
})
export class ListPage {
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, icon: string }>;



    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];

        this.items = [];

        for (let i = 1; i < 6; i++) {
            this.items.push({
                title: 'Stock ' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
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
}
