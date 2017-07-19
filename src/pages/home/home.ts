import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// HTTP
import { RestService } from '../../shared/rest.service'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // url: string = "http://192.168.1.92:8080/rest/entrypoint/branches/35/queues/18/visits";
  // url: string = "https://randomuser.me/api/?results=1";

  constructor(public navCtrl: NavController, private rest: RestService) {
    this.rest.clearBasicAuthen();
    this.rest.setBasicAuthen(btoa("superadmin:ulan"));
    this.rest.get("/rest/entrypoint/branches/35/queues/18/visits")
      .then( (data) => {
        console.log(data)
      });
  }

}
