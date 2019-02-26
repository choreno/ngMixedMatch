import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "./rest.service";
import { filter } from "rxjs/operators";
import { from, of } from "rxjs";

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragEnter,
  CdkDragExit
} from "@angular/cdk/drag-drop";

import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

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

  shuffledA: any = [];
  shuffledB: any = [];

  numberOfPoolA: number;
  numberOfPoolB: number;

  isMatchVisible: boolean = false;
  matchCount: number = 0;
  matchA: any = [];
  matchB: any = [];

  constructor(private rest: RestService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getMembers();
  }

  goodLuck() {
    this.numberOfPoolA = this.poolA.length;
    this.numberOfPoolB = this.poolB.length;

    if (this.numberOfPoolA != this.numberOfPoolB) {
      this.showSnackBar("양쪽 Pool의 선수숫자가 일치하지 않습니다.", null);
      this.isMatchVisible = false;
      return;
    }

    if (this.numberOfPoolA < 2 && this.numberOfPoolB < 2) {
      this.showSnackBar(
        "최소 두명의 선수를 양쪽 Pool에 할당하시기 바랍니다.",
        null
      );
      this.isMatchVisible = false;
      return;
    }

    //make match visible
    this.isMatchVisible = true;

    //Shuffle each pool

    this.shuffledA = this.poolA.slice(0);
    this.shuffledB = this.poolB.slice(0);

    this.shuffle(this.shuffledA);
    this.shuffle(this.shuffledB);

    // //chunk array
    // //i.e., [0,1,2,3,4,5,6,7] => [[0,1],[2,3],[4,5],[6,7]]
    // let chunkSize = 2;
    // this.matchA = [];
    // this.matchB = [];
    // while (this.shuffledA.length > 0) {
    //   this.matchA.push(this.shuffledA.splice(0, chunkSize));
    //   this.matchB.push(this.shuffledB.splice(0, chunkSize));
    // }

    // this.matchCount = this.matchA.length; //either matchA or matchB
    // console.log(this.matchA);
    // console.log(this.matchB);
    console.log(this.shuffledA);
  }

  // matchArray(count:number){

  //   var pseudoArray = new Array();

  //   let iteration = Math.ceil(count/2);
  //   for(let i = 0 ; i < iteration ;i++){
  //     pseudoArray.push(i);
  //   }

  //   return pseudoArray;
  // }

  shuffle(obj: any) {
    for (var i = 0; i < obj.length; i++) {
      var a = obj[i];
      var b = Math.floor(Math.random() * obj.length);
      obj[i] = obj[b];
      obj[b] = a;
    }
  }

  showSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, action, config);
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
}
