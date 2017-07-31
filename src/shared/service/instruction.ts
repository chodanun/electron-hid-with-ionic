import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {INSTRUCTION} from '../mock-instruction';
/*
  Generated class for the InstructionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class InstructionProvider {

  

  constructor(public http: Http) {
    console.log('Hello InstructionProvider Provider');
    
  }

  getInstruction(serviceNumber){
    return INSTRUCTION.filter( (obj) =>{
      return obj.serviceNumber == serviceNumber;
    })
  }

}
