import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  toggle = false;

  constructor() {

  }

  public handleClick() {
    console.log("Handle click:", this.toggle)
    this.toggle = !this.toggle
  }
}
