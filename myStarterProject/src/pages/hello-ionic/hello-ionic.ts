import { Component } from '@angular/core';
// import {File} from 'ionic-native';


@Component({
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor() {

  }
  fileBrowser(event){
    alert("You clicked me");
    // var cordova : any;
    // File.listDir(cordova.file.applicationDirectory, 'mySubFolder/mySubSubFolder').then(
    //   (files) => {
    //     alert("Did it work??");
    //   }
    //   ).catch(
    //   (err) => {
    //     alert("Error!")
    //   }
    //   );
  }
}
