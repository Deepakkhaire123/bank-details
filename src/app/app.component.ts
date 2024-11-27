import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Payment-gateway';
  BankData : any;
  constructor(private apiServe : ApiService, private router : Router) { }

  ngOnInit(): void {
      this.apiServe.getBankData().subscribe((res : any)=>{
        let daattaa = this.apiServe.decryptData(res?.data)
        this.BankData = daattaa?.data;
        this.router.navigate([`/bank/${this.BankData?.[2]?.bank_name}`])
      })
  }
   
}
