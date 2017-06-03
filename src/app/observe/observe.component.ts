import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-observe',
  templateUrl: './observe.component.html',
  styleUrls: ['./observe.component.css']
})
export class ObserveComponent implements OnInit {

 data: Observable<number>;
 values: Array<number> = [];
 anyErrors: boolean;
 finished: boolean;
 counter: any =200;
 status: string ='';
 constructor() { }
 ngOnInit() {}

  init() {
        this.data = new Observable(observer => {
         let interval = setInterval(() => {
              this.counter ++;
                observer.next(this.counter);
            }, 100);

            setTimeout(() => {
                observer.complete();
                clearInterval(interval);
            }, 3000);

            this.status = "Started";
        });

        //let subscription = this.data.forEach((v) =>{this.values.push(v) }).then(() => this.status = "Ended");
        let subscription1 = this.data.subscribe(
         (x) => { this.values.push(x) },
         (e) => { console.log('onError: %s', e); },
         () => { this.status = "Ended" });
       }
}
