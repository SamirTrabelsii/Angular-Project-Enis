import { Component,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private authservice:AuthService, private router:Router,private ngZone:NgZone){}
  tryLogout():void{
    this.authservice.doLogout().then(()=>{
      this.succesRedirect()
    })
  }
  succesRedirect():void{
    this.ngZone.run(()=>{this.router.navigate(['/login'])
  })}


}
