import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.css']
})
export class FullDetailsComponent implements OnInit{
  bankname : any;
  fullDetails : any;
  ErrorMessage = false;
  constructor(private router: ActivatedRoute, private apiServe : ApiService) { }
  
  ngOnInit(): void {
    this.router.paramMap.subscribe((param : any)=>{
      this.bankname = param.get('bankname');
      let data = {
        bank_name : this.bankname
      }
      this.apiServe.getfullDetals(data).subscribe((res : any)=>{
        let dataa = this.apiServe.decryptData(res?.data)
        this.fullDetails = dataa?.data;
        this.ErrorMessage = false;
      }, error =>{
        this.ErrorMessage = true;
        this.showAlert2(error.error.message)
      })
    }) 
  }
 
  showAlert2(message: any) {
    const swalWithStyle = Swal.mixin({
      customClass: {
        popup: 'my-custom-popup',
        confirmButton: 'my-custom-button',
      },
    });
  
    swalWithStyle.fire({
      position: 'top-end',
      width: 'auto',
      padding: '0.5rem', 
      color: '#fff',
      background: '#f44336', 
      icon: 'error',
      title: message,
      showConfirmButton: false, 
      timer: 3000, 
      toast: true, 
    });
  
    const customCss = `
      .swal2-popup.my-custom-popup {
        border-radius: 5px;
        border: none;
        font-size: 14px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        margin-top: 4rem;
      }
      .swal2-icon.swal2-error {
        display: none; /* Hide the default icon to keep it clean */
      }
    `;
    
    const style = document.createElement('style');
    style.textContent = customCss;
    document.head.append(style);
  }
}
