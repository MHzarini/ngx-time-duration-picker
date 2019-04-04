import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-time-duration-picker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ngx-time-duration-picker';
  value: any;

  ngOnInit(): void {
    this.value = 0;
  }

  onValueChanged(value) {
    this.value = value;
  }
}
