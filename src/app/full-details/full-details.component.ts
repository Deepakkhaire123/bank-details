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
        console.log(this.fullDetails);
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
      position: 'top-end', // Position the alert at the top right or change it as needed
      width: 'auto', // Adjust width for bar-like appearance
      padding: '0.5rem', // Reduced padding for compact look
      color: '#fff',
      background: '#f44336', // Red bar color for error
      icon: 'error',
      title: message,
      showConfirmButton: false, // Hides the confirm button
      timer: 3000, // Auto-dismiss after 3 seconds
      toast: true, // Make it look like a bar notification
    });
  
    // Apply custom styles for a bar-like appearance
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
