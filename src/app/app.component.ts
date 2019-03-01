import { Component } from "@angular/core";
import { RestService } from "./rest.service";

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

import { MatSnackBar, MatSnackBarConfig } from "@angular/material";

import { MemberService } from "./service/member.service";
import { Member } from "./model/member.model";
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

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

  btnPressCount: number = 0; 

  //fireMembers: Member[];
  fireMembers: Observable<any[]> ;

  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar,
    private MemberService: MemberService,
    private db:AngularFirestore
  ) {

    //this.fireMembers = db.collection('members').valueChanges();

    // console.log(this.fireMembers);
  }

  ngOnInit() {
    this.getMembers();
    // this.MemberService.getFirebaseMembers().subscribe(result => {
    //   this.fireMembers = result;
    //   console.log(result);
    // });

    // this.MemberService.getFirebaseMembers().subscribe(data => {
    //   this.fireMembers = db.collection('members').valueChanges();
    //   // this.fireMembers = data.map(x => {
    //   //   console.log(x.payload.doc.data());
    //   //   // return {
    //   //   //   name: x.payload.doc.data.name,
    //   //   //   pool: x.payload.doc.data.pool,
          
    //   //   // } as Member;
    //   // });
    // });

    // //console.log('ttt');
    // console.log(this.fireMembers);
    this.fireMembers = this.db.collection('members').valueChanges();

  }

  goodLuck() {

    

    this.numberOfPoolA = this.poolA.length;
    this.numberOfPoolB = this.poolB.length;

    if (this.numberOfPoolA != this.numberOfPoolB) {
      this.showSnackBar("양쪽 Pool의 선수숫자가 일치하지 않습니다.", null);
      this.isMatchVisible = false;
      return;
    }

    if (this.numberOfPoolA < 2) {
      this.showSnackBar(
        "최소 두명의 선수를 양쪽 Pool에 할당하시기 바랍니다.",
        null
      );
      this.isMatchVisible = false;
      return;
    }
    if (this.numberOfPoolA % 2 != 0) {
      this.showSnackBar(
        "짝수명 만큼의 선수를 양쪽 Pool에 할당하시기 바랍니다.",
        null
      );
      this.isMatchVisible = false;
      return;
    }

    this.btnPressCount++ ; 

    //make match visible
    this.isMatchVisible = true;

    //Shuffle each pool
    this.shuffledA = this.poolA.slice(0);
    this.shuffledB = this.poolB.slice(0);

    this.shuffle(this.shuffledA);
    this.shuffle(this.shuffledB);
  }

  matchArray() {
    var loopArray = new Array();

    let iteration = Math.ceil(this.shuffledA.length / 2);
    for (let i = 1; i <= iteration; i++) {
      loopArray.push(i);
    }

    return loopArray;
  }

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

    this.btnPressCount = 0 ; 
    
  }
}
