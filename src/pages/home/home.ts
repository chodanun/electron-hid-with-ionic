import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


// HTTP
import { RestService } from '../../shared/rest.service'

// BARCODE READER
declare var HID: any;

// Model
import { InputModel } from '../../shared/model/inputModel'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mKey: any;
  test: any = "hello";
  barcodeInputModel: InputModel;
  // url: string = "/rest/entrypoint/branches/35/entryPoints/2/visits/";
  url: string = "http://192.168.1.92:8080/rest/entrypoint/branches/35/entryPoints/2/visits/";
  proxyEventUrl: string= "http://192.168.1.201:8080/ciix-fusion/rest/proxy/events/";
  stream_input: string = null;
  body: any = {
    "services" : [14],
    "parameters" : {
      // "customerName":"",
      // "isMobile" : "",
      // "public_key":"sdsdsds",
      // "mKey": "",
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
    // this.dev();
  }
  

  init(){
    this.barcode_process();
  }

  barcode_process(){
    let barcode_reader = this.getDevice();
    this.getData(barcode_reader);
  }

  postData(barcode_data){
    try {
      var inputJSON = JSON.parse(barcode_data);  
      console.log(inputJSON);
      this.barcodeInputModel = inputJSON;
      if (this.barcodeInputModel.isMobile){
        this.mKey = this.barcodeInputModel.mKey;
        this.body.parameters = this.barcodeInputModel ;
        this.postToR6();
        this.postToProxy();
      }else{
        console.log(`it's not "QR-App" barcode`)
      }
      
    } catch (error) {
      console.log("it's not a mobile device or wrong format in json");
    }
  }

  postToProxy(){
    this.proxyEventBody.mKey = this.barcodeInputModel.mKey;
    // console.log(this.proxyEventBody);
    this.rest.post(this.proxyEventUrl,this.proxyEventBody)
      .then( (data) => {
        console.log(data);
      });
  }

  postToR6(){
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
      console.log(data);
      let string_data = this.hexToString(data);
      console.log(string_data);
      this.postData(string_data);
    });
  }

  getDevice(){
    let devices = HID.devices();
    let device = devices.filter( device => {
      return device.serialNumber == "17161B2BEE";
    })[0];
    
    console.log(device);

    let productId = device.productId;
    let vendorId = device.vendorId;
    let barcode_reader = new HID.HID(vendorId,productId);
    return barcode_reader;
  }

  hexToString (data) {
    let startByte = 5 ;
    let numberOfDataByte = data[1];
    let endByte = startByte + numberOfDataByte;
    let dataArr = data.slice(startByte,endByte);
    let isShiftOut = dataArr[dataArr.length-1] != 13
    console.log(dataArr);
    console.log(isShiftOut);
    if (isShiftOut){
      this.stream_input += this.translate(dataArr);
    }else{
      // return this.translate(dataArr);

      if (this.stream_input==null){
        return this.translate(dataArr);
      }else{
        this.stream_input+= this.translate(dataArr);
        let data = this.stream_input ;
        this.stream_input = null;
        return data;
      }
      
    }
    
  }

  translate(data){
    let string = '';
    let h ;
    let hex = data.toString('hex')
    for (let i = 0; i < hex.length; i += 2) {
      h = parseInt(hex.substr(i,2), 16);
      if (h == 13){ // carriage return number
        return string ;
      }
      string += String.fromCharCode(h);
    }
    return string;
  }
  dev(){
    this.postData('{"mKey":"-KpOuhweuWiM_1ti3K-Z","customerName":"Chodanun Srinil","isMobile":"true","other":"test"}');
  }

}
