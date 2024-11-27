import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.baseUrl;
  secretKey = environment.secretKey;
  constructor(private http : HttpClient) { }

  getBankData(){
    return this.http.get(`${this.url}listbank`);
  }
  getfullDetals(data : any){
    return this.http.post(`${this.url}bankdetails`,this.encryptData(data));
  }
 encryptData(data: any): string {
    let stringData: string;
    if (data instanceof FormData) {
      const formDataObj: Record<string, any> = {};
      data.forEach((value, key) => {
        formDataObj[key] = value;
      });
      stringData = JSON.stringify(formDataObj);
    } else if (typeof data === "object") {
      stringData = JSON.stringify(data);
    } else {
      stringData = data;
    }
    const encrypted = CryptoJS.AES.encrypt(stringData, this.secretKey).toString();
    return encrypted;
  }


  decryptData(encryptedData: string): any {

    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedData);

  }

}
