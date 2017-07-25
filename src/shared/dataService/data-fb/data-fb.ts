import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// Firebase database
import { AngularFireDatabase} from 'angularfire2/database';

/*
  Generated class for the DataFbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataFbProvider {

  constructor(public http: Http, public db: AngularFireDatabase) {
    console.log('Hello DataFbProvider Provider');
  }

  addRequiredFields(orgId,arrFields){
    return new Promise ( (res,rej) => {
       const item = this.db.list(`Required/${orgId}`);
       item.push(arrFields).then( ()=>{
         res("finish")
       })
    })
  }

}
