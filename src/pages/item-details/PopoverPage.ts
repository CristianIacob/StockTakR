import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FileChooser, File } from 'ionic-native';
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
      this.importToCurrentList();
        var self = this;
        FileChooser.open()
            .then((uri) => {
                window.resolveLocalFileSystemURL(uri, function(entry) {
                    entry.file(
                        (file) => {
                            var reader = new FileReader();
                            reader.onloadend = function(e) {
                                var result = JSON.parse(e.target["_result"]);
                                self.importToCurrentList(result);
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

  importToCurrentList(fileContent: string) {
    console.log('importing');

    console.log('JSON list: ', fileContent)
    this.dataService.getStockList(this.stockName)
      .then(data => {
        console.log("currentList ->", JSON.stringify(data));
        var mergedObj = this.mergeRecursive(fileContent, data);
        this.dataService.setStockList(this.stockName, mergedObj);

        console.log("merged ->", mergedObj);
      });
  }

    exportAll() {
      this.dataService.getStockList(this.stockName)
        .then(data => {
          this.exportToFile(this.stockName + ".json", JSON.stringify(data));
        });
      this.viewCtrl.dismiss();
    }

    exportToFile(filePath: string, fileContent: string) {
      File.writeFile(cordova.file.externalRootDirectory, filePath, fileContent, { replace: true });
    }

  mergeRecursive(obj1, obj2) {
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj2[p].constructor == Object) {
          obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);

        } else {
          obj1[p] = obj2[p];

        }

      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];

      }
    }

    return obj1;
    }

}
