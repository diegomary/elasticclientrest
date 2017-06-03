
import { Component, OnInit,AfterViewInit } from '@angular/core';

import { FlowerService } from '../services/flowerservice';
import $ from 'jquery/dist/jquery'
@Component({
  selector: 'app-auth',
  providers: [FlowerService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit  {
constructor(private flowerservice: FlowerService) { }

title = 'Auth';
jqueryversion = `This site is using Jquery ${$.fn.jquery}`;
name = 'David';
counter = 10;
flowers = [];
token = {token:{}};

ngAfterViewInit() {

  this.flowerservice.authenticate().subscribe(data => this.token = data,
    function error(err) { console.error('Error: ' + err)},
    () => console.log('Token Refreshed!')
  );
 }
ngOnInit() {}
increment() { this.counter++; }
decrement() { this.counter--; }
refreshToken() { this.flowerservice.authenticate().subscribe(data => this.token = data,
    function error(err) { console.error('Error: ' + err)},
    () => console.log('Token Refreshed!')
  );
}
loadFlowers() {
    this.flowerservice.getFlowers().subscribe(data => this.flowers = data,function error(err){},() => console.log("Flowers loaded"));
  }
}
