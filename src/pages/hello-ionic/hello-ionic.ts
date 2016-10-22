import { Component } from '@angular/core';
// import { FileChooser } from 'ionic-native';
// declare var cordova: any;
// declare var window;

@Component({
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    constructor() {

    }

    fileBrowser(event) {
    //     const fs: string = cordova.file.dataDirectory;
    //
    //     FileChooser.open()
    //         .then((uri) => {
    //             window.resolveLocalFileSystemURL(uri, function(entry) {
    //                 entry.file(
    //                     (file) => {
    //                         var reader = new FileReader();
    //                         reader.onloadend = function(e) {
    //                             alert('result: ' + e.target["_result"]);
    //                             JSON.parse(e.target["_result"], (key, value) => {
    //                                 alert(key);
    //                                 return value;
    //                             });
    //
    //                         };
    //                         reader.readAsText(file);
    //                     },
    //                     (error) => {
    //                         alert("FileEntry.file error: " + error.code);
    //                     }
    //                 );
    //             },
    //                 function(error) {
    //                     alert("resolveLocalFileSystemURL error: " + error.code);
    //                 });
    //         })
    //         .catch(e => alert(JSON.stringify(e)));
    }
}
