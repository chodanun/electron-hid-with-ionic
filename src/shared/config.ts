import { Injectable } from '@angular/core';
// export const config = {
//     orchUrl: "http://192.168.1.92:8080/rest/entrypoint/branches/35/entryPoints/2/visits/",
//     proxyEventUrl: "http://192.168.1.202:8080/ciix-fusion/rest/proxy/events/",
// }

@Injectable()
export class Config {
    oIp: string;
    pIp: string;
    oUrl: string ;
    pUrl: string ;

    setEnv(oIp,pIp){
        this.oIp = oIp;
        this.pIp = pIp;
    }

    setOrchUrl(branchId,entId){
        this.oUrl = `http://${this.oIp}/rest/entrypoint/branches/${branchId}/entryPoints/${entId}/visits/`;
    }

    setProxyEventUrl(){
        this.pUrl = `http://${this.pIp}/ciix-fusion/rest/proxy/events/`;
    }

    getOrchUrl(){
        return this.oUrl;
    }

    getProxyEventUrl(){
        return this.pUrl;
    }
}