import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

// HTTP
import { RestService } from '../shared/rest.service'

// BARCODE READER
// declare var HID: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  url: string = "/rest/entrypoint/branches/35/entryPoints/2/visits/";
  body: any = {
    "services" : [14],
    "parameters" : {
      "customerName":"visitor noioie223",
      "isMobile" : "true",
      "public_key":"sdsdsds",
      "mKey": "",
    }
  }
  ticketId: string ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private rest: RestService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      // this.init();
      this.dev();
    });
  }

  // init(){
  //   this.barcode_process();
  // }

  // barcode_process(){
  //   let barcode_reader = this.getDevice();
  //   this.getData(barcode_reader);
  // }

  postData(barcode_data){
    this.body.parameters.mKey = barcode_data;
    console.log(this.body)
    
    this.rest.clearBasicAuthen();
    this.rest.setBasicAuthen(btoa("superadmin:ulan"));
    this.rest.post(this.url,this.body)
      .then( (data) => {
        console.log(data);
        console.log(data.ticketId);
        this.ticketId = data.ticketId;
      });
      
    // this.rest.get("/rest/entrypoint/branches/35/queues/18/visits")
    //   .then( (data) => {
    //     console.log(data)
    //   });
  }

  // getData(br){
  //   br.on("data", (data) => {
  //     // console.log(data);
  //     // console.log(data.toString('hex'));
  //     let string_data = this.hexToString(data);
  //     console.log(string_data);
  //     this.postData(string_data);
  //     // console.log(string_data.length);
  //   });
  // }

  // getDevice(){
  //   let devices = HID.devices();
  //   let device = devices.filter( device => {
  //     return device.serialNumber == "17161B2BEE"
  //   })[0];
    
  //   console.log(device);

  //   let productId = device.productId;
  //   let vendorId = device.vendorId;
  //   let barcode_reader = new HID.HID(vendorId,productId);
  //   return barcode_reader;
  // }

  // hexToString (data) {
  //   let string = '';
  //   let i ; // start byte -> 10
  //   let h ;
  //   let hex = data.toString('hex')
  //   for (i=10; i < hex.length; i += 2) {
  //     h = parseInt(hex.substr(i,2), 16);
  //     if (h == 13){ // carriage return number
  //       return string ;
  //     }
  //     string += String.fromCharCode(h);
  //   }
  //   return string;
  // }

  dev(){
    this.postData("-KpOuhweuWiM_1ti3K-Z");
  }
}

