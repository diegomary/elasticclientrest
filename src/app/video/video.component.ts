import { Component, OnInit,AfterViewInit } from '@angular/core';
import jwplayer from  '@bianjp/jwplayer/dist/jwplayer';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements AfterViewInit {

  constructor() { }
ngAfterViewInit(){
  let playerInstance = jwplayer("jwplayercontainer");
    playerInstance.setup({
    "playlist": "./assets/playList.txt",   // renamed from json to txt because dmm888.com doesn't like json
    "height": 200,
    "width": 350,
    "key":"G1VjVx3NzbExARB/D0TFxwr4oC3ilweCL/dt3A==",
    "autostart": false});
 }
  ngOnInit() {

  }

}
