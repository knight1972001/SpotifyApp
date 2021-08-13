/*********************************************************************************
* WEB422 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Long Nguyen  Student ID: 155176183 Date: July 29th, 2021
*
********************************************************************************/
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClientModule]
})
export class AppComponent implements OnInit{
  searchString:string;
  title = 'web422-a4';
  public token: any;

  constructor(private router: Router, private auth:AuthService) {  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }

  handleSearch(){
    this.router.navigate(['/']).then(()=>
      this.router.navigate(['/search'],{queryParams: {searchQuery: this.searchString}})
    )
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
