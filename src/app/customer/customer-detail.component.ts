import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ApiService } from '../services/api.service';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
 
})
export class CustomerDetailComponent implements OnInit {

  routerSubscription: any;
  customer: any={};
  id: number;
  constructor(private customerService:CustomerService, private route:ActivatedRoute, private router: Router,
     private notification: NotificationService, private apiService:ApiService) { }

  ngOnInit() {
this.routerSubscription = this.route.params.subscribe(params=>{
  this.id = +params['id']; //convert string 'id' to a number
  if (this.id >0)
  this.customerService.getCustomer(this.id).then(res=>{
    this.customer = res;
    console.log(this.customer);
  })
})
  
}

save(){
  this.customerService.saveCustomer(this.customer).then((res:any)=>{
    if(this.id ===0) this.router.navigate(["/main/customer-detail",res.Id]);
    this.notification.success('Saved');
  })
}

ngOnDestroy(){
  this.routerSubscription.unsubscribe();
}


  
}