import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


// HTTP
import { RestService } from '../../shared/rest.service'

// BARCODE READER
declare var HID: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mKey: any;
  test: any = "hello";
  // url: string = "/rest/entrypoint/branches/35/entryPoints/2/visits/";
  url: string = "http://192.168.1.92:8080/rest/entrypoint/branches/35/entryPoints/2/visits/";
  proxyEventUrl: string= "http://192.168.1.201:8080/ciix-fusion/rest/proxy/events/";
  body: any = {
    "services" : [14],
    "parameters" : {
      "customerName":"visitor noioie223",
      "isMobile" : "true",
      "public_key":"sdsdsds",
      "mKey": "",
    }
  }
  proxyEventBody: any = {
    eventName: "FLOWTOCOL.VISIT_CREATE",
    status: "LISTENING_DATA",
    mKey: "",
  }
  ticketId: string ;

  constructor(public navCtrl: NavController, private rest: RestService) {
    this.init();
  }
  

  init(){
    this.barcode_process();
  }

  barcode_process(){
    let barcode_reader = this.getDevice();
    this.getData(barcode_reader);
  }

  postData(barcode_data){
    this.mKey = barcode_data;
    this.body.parameters.mKey = this.mKey;
    
    this.postToR6(barcode_data);
    this.postToProxy(barcode_data);
      
  }

  postToProxy(barcode_data){
    this.proxyEventBody.mKey = barcode_data;
    // console.log(this.proxyEventBody);
    this.rest.post(this.proxyEventUrl,this.proxyEventBody)
      .then( (data) => {
        console.log(data);
      });
  }

  postToR6(barcode_data){
    console.log(this.body)
    this.rest.setBasicAuthen(btoa("superadmin:ulan"));
    this.rest.post(this.url,this.body)
      .then( (data) => {
        console.log(data);
        this.ticketId = data.ticketId;
      });
  }

  getData(br){
    br.on("data", (data) => {
      // console.log(data);
      // console.log(data.toString('hex'));
      let string_data = this.hexToString(data);
      console.log(string_data);
      this.mKey = string_data ;
      this.postData(string_data);
    });
  }

  getDevice(){
    let devices = HID.devices();
    let device = devices.filter( device => {
      return device.serialNumber == "17161B2BEE"
    })[0];
    
    console.log(device);

    let productId = device.productId;
    let vendorId = device.vendorId;
    let barcode_reader = new HID.HID(vendorId,productId);
    return barcode_reader;
  }

  hexToString (data) {
    let string = '';
    let i ; // start byte -> 10
    let h ;
    let hex = data.toString('hex')
    for (i=10; i < hex.length; i += 2) {
      h = parseInt(hex.substr(i,2), 16);
      if (h == 13){ // carriage return number
        return string ;
      }
      string += String.fromCharCode(h);
    }
    return string;
  }

  dev(){
    this.postData("-KpOuhweuWiM_1ti3K-Z");
  }

}
