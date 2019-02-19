import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "./rest.service";
import { filter } from "rxjs/operators";
import { from } from "rxjs";

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "title will be here ...";
  members: any = [];
  poolA: any = [];
  poolB: any = [];
  constructor(private rest: RestService) {}

  ngOnInit() {
    this.getMembers();
    // this.getPoolA();
    // this.getPoolB();
    this.poolA.push({name:'itemA', pool:'A'});
    this.poolB.push({name:'itemB', pool:'B'});

  }

  getMembers() {
    this.members = [];
    this.rest.getMembers().subscribe((data: {}) => {
      console.log(data);
      this.members = data;
    });
  }

  getPoolA() {
    this.poolA = [];
    this.rest.getMembersByPool('A').subscribe((data: {}) => {
      console.log(data);
      this.poolA = data;
    });
  }

  getPoolB() {
    this.poolB = [];
    this.rest.getMembersByPool('B').subscribe((data: {}) => {
      console.log(data);
      this.poolB = data;
    });
  }

  todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];

  done = ["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"];

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  artists = [
    "Artist I - Davido",
    "Artist II - Wizkid",
    "Artist III - Burna Boy",
    "Artist IV - Kiss Daniel",
    "Artist V - Mayorkun",
    "Artist VI - Mr. Eazi",
    "Artist VII - Tiwa Savage",
    "Artist VIII - Blaqbonez",
    "Artist IX - Banky W",
    "Artist X - Yemi Alade",
    "Artist XI - Perruzi",
    "Artist XII - Seyi Shay",
    "Artist XIII - Teni"
  ];

  alteArtists = [
    "Artist 1 — Odunsi",
    "Artist 2 — Nonso",
    "Artist 3 — Wavy the creator",
    "Artist 4 — Dwin",
    "Artist 5 — SDC",
    "Artist 6 — Teni"
  ];

  // drop(event: CdkDragDrop<string[]>) {

  //     moveItemInArray(
  //       this.artists,
  //       event.previousIndex,
  //       event.currentIndex
  //     );

  // }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
