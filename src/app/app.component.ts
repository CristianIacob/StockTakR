import { Component, ViewChild } from '@angular/core';

import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { ListPage } from '../pages/list/list';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    // make HelloIonicPage the root (or first) page
    rootPage: any = ListPage;

    constructor(
        public platform: Platform
    ) {
        this.initializeApp();


    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }


}
