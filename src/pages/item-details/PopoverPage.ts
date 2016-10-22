import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FileChooser } from 'ionic-native';
import { PersistenceApi } from "../../app/shared/persistence.service";
import { StockList } from "../../app/shared/StockList";
declare var cordova: any;
declare var window;

@Component({
    templateUrl: 'PopoverPage.html'
})

export class PopoverPage {
    stockLists: StockList[] = [];
    stockName: string;

    constructor(public viewCtrl: ViewController, public params: NavParams, private dataService: PersistenceApi) {
        console.log(params);
        this.stockName = params.get('stockName');
        console.log("sent data: ", this.stockName);
    }

    import() {
        var self = this;
        FileChooser.open()
            .then((uri) => {
                window.resolveLocalFileSystemURL(uri, function(entry) {
                    entry.file(
                        (file) => {
                            var reader = new FileReader();
                            reader.onloadend = function(e) {
                                var result = JSON.parse(e.target["_result"]);
                                for(var list of self.stockLists) {
                                  if(list.name === self.stockName) {
                                  }
                                }
                                localStorage.setItem(self.stockName, JSON.stringify(result.stock));
                            };
                            reader.readAsText(file);
                        },
                        (error) => {
                            alert("FileEntry.file error: " + error.code);
                        }
                    );
                },
                    function(error) {
                        alert("resolveLocalFileSystemURL error: " + error.code);
                    });
            })
            .catch(e => alert(JSON.stringify(e)));
        this.viewCtrl.dismiss();
    }

    exportAll() {
        alert("export all")
        this.viewCtrl.dismiss();
    }

    exportUpdate() {
        alert("export update")
        this.viewCtrl.dismiss();
    }

    ionViewWillEnter() {
        this.dataService.getStockList().then(data => {
            if (data) {
                this.stockLists = data;
            }
        });
    }

}
