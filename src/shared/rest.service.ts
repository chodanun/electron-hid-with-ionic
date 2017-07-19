import { Injectable } from '@angular/core';
import { RequestOptionsArgs, Http, Headers } from '@angular/http';

@Injectable()
export class RestService {
    basicAuthen:string = '';
    constructor(private http: Http) {
    }

    clearBasicAuthen(){
        this.basicAuthen = '';
    }
    setBasicAuthen(authenString) {
        this.basicAuthen = 'Basic ' + authenString;
    }
    get(url: string, options?: RequestOptionsArgs): Promise<any> {
        //this.logger.info('Option :', options);
        // var optionTmp;
        // if (options !== undefined) {
        //     optionTmp = { headers: options };
        // }

        if (options === undefined) {
            options = { headers: new Headers({ 'Authorization': this.basicAuthen }) };
            options.withCredentials = false;
        }else if(!options.headers) {
            options.headers = new Headers();
            options.headers.append('Authorization',this.basicAuthen);
        }else{
            options.headers.append('Authorization',this.basicAuthen);        
            
        }
        options.headers.append('Content-Type','application/json');
        // options.headers.append('Access-Control-Allow-Origin','*');
        console.log(options)
        return new Promise<any>((resolve, reject) =>
            this.http.get(url, options)
                .subscribe(
                res => {
                    try{
                        resolve(res.json());
                    }catch(e){
                        resolve(res)
                    }
                },
                err => {
                    reject(err);
                }
                )
        );
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
        if (options === undefined) {
            options = { headers: new Headers({ 'Authorization': this.basicAuthen }) };
        }else if(!options.headers) {
            options.headers = new Headers();
            options.headers.append('Authorization',this.basicAuthen);
        }
        options.headers.append('Content-Type','application/json');
        return new Promise<any>((resolve, reject) =>
            this.http.post(url, body, options)
                .subscribe(
                res => {
                    try{
                        resolve(res.json());
                    }catch(e){
                        resolve(res)
                    }
                },
                err => {
                    reject(err);
                }
                )
        );
    }

    originalPost(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
        if (options === undefined) {
            options = {};
        }
        return new Promise<any>((resolve, reject) =>
            this.http.post(url, body, options)
                .subscribe(
                res => {
                    try{
      
                        resolve(res.json());
                    }catch(e){
                        resolve(res)
                    }
                },
                err => {
                    reject(err);
                }
                )
        );
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Promise<any> {
        if (options === undefined) {
            options = { headers: new Headers({ 'Authorization': this.basicAuthen }) };
        }else if(!options.headers) {
            options.headers = new Headers();
            options.headers.append('Authorization',this.basicAuthen);
        }
        options.headers.append('Content-Type','application/json');
        return new Promise<any>((resolve, reject) =>
            this.http.put(url, body, options)
                .subscribe(
                res => {
                    try{
          
                        resolve(res.json());
                    }catch(e){
                        resolve(res)
                    }
                },
                err => {
                    reject(err);
                }
                )
        );
    }

    delete(url: string, options?: RequestOptionsArgs): Promise<any> {
        if (options === undefined) {
            options = { headers: new Headers({ 'Authorization': this.basicAuthen }) };
        }else if(!options.headers) {
            options.headers = new Headers();
            options.headers.append('Authorization',this.basicAuthen);
        }
        options.headers.append('Content-Type','application/json');
        return new Promise<any>((resolve, reject) =>
            this.http.delete(url, options)
                .subscribe(
                res => {
                    resolve(res);
                },
                err => {
                    reject(err);
                }
                )
        );
    }
}