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
  transferArrayItem,
  CdkDragEnter,
  CdkDragExit
} from "@angular/cdk/drag-drop";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "title will be here ...";
  members: any = [];

  availableMembers: any = [];
  poolA: any = [];
  poolB: any = [];
  constructor(private rest: RestService) {}

  numberOfPoolA: number;
  numberOfPoolB: number; 

  ngOnInit() {
    this.getMembers();
    
  }

  goodLuck() {
    console.log(this.poolA);
    console.log(this.poolB);
    console.log('poolA count:' + this.poolA.length, ' poolB count: ' + this.poolB.length);

    this.numberOfPoolA = this.poolA.length;
    this.numberOfPoolB = this.poolB.length; 

    if(this.numberOfPoolA != this.numberOfPoolB) {
      alert('Pool A, Pool B 선수숫자가 일치하지 않습니다.')
      return; 
    }

  }

  getMembers() {
    this.members = [];
    this.rest.getMembers().subscribe((data: {}) => {
      this.members = data;

      this.availableMembers = this.members.filter(function(x) {
        return x.pool == "X";
      });


      this.poolA = this.members.filter(function(x) {
        return x.pool == "A";
      });

      this.poolB = this.members.filter(function(x) {
        return x.pool == "B";
      });

      this.numberOfPoolA = this.poolA.length;
      this.numberOfPoolB = this.poolB.length; 
    });
  }

  // getPoolA() {
  //   this.poolA = [];
  //   this.rest.getMembersByPool("A").subscribe((data: {}) => {
  //     console.log(data);
  //     this.poolA = data;
  //   });
  // }

  // getPoolB() {
  //   this.poolB = [];
  //   this.rest.getMembersByPool("B").subscribe((data: {}) => {
  //     console.log(data);
  //     this.poolB = data;
  //   });
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

    //updated number of players at pool
    this.numberOfPoolA = this.poolA.length;
    this.numberOfPoolB = this.poolB.length; 

  }

  // enteredPoolA(event: CdkDragEnter<string[]>) {
  //   console.log("Entered", event.item.data);

  //   // this.poolA.push({id: name: element.name, pool:"A"}) ;

  //   // this.poolA.forEach(element => {

  //   //   console.log(element.name);

  //   // });
  // }
  // exitedPoolA(event: CdkDragExit<string[]>) {
  //   console.log("Exited", event.item.data);
  //   //console.log(this.poolA);
  //   //console.log(event.container.data.length);
  //   //this.numberOfPoolA = this.poolA.length;
  // }
}
