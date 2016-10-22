import { Component } from '@angular/core';
import { FileChooser, File } from 'ionic-native';
declare var cordova: any;
declare var window;

@Component({
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    constructor() {

    }
    fileBrowser(event) {
        const fs: string = cordova.file.dataDirectory;
        alert('fs : ' + fs);

        FileChooser.open()
            .then((uri) => {
                alert('uri: ' + uri);
                window.resolveLocalFileSystemURL(uri, function(entry) {
                    alert('entry: ' + JSON.stringify(entry));
                    entry.file(
                        (file) => {
                            var reader = new FileReader();
                            reader.onloadend = function(e) {
                                alert('result: ' + JSON.stringify(e.target["_result"]));
                            };
                            reader.readAsText(file);
                            alert('filereader');
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
    }


}
