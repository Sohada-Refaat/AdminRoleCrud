import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  showMenu = true;
  constructor(
  ) {}

  ngOnInit() {
  }

  toggleClick() {
    this.showMenu = !this.showMenu;
  }

  openTab() {
    this.showMenu = false;
  }

  logout() {
  }
}
