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
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "KTC Mixed Match";
  members: any = [];

  availableMembers: Member[] = [];
  poolA: Member[] = [];
  poolB: Member[] = [];

  shuffledA: any = [];
  shuffledB: any = [];

  numberOfPoolA: number;
  numberOfPoolB: number;

  isMatchVisible: boolean = false;

  btnPressCount: number = 0;

  afsMemberCol: AngularFirestoreCollection<Member>;
  afsMembers: Observable<Member[]>;
  obsPoolA: Observable<Member[]>;
  obsPoolB: Observable<Member[]>;
  obsAvailable: Observable<Member[]>;

  constructor(
    private rest: RestService,
    private snackBar: MatSnackBar,
    private MemberService: MemberService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {

    //this.getMembers();

    //angular firestore
    this.afsMemberCol = this.afs.collection("members");
    this.afsMembers = this.afsMemberCol.valueChanges();

    this.obsPoolA = this.afsMembers.pipe(
      map(x => {
        return x.filter(y => y.pool == "A");
      })
    );

    this.obsPoolB = this.afsMembers.pipe(
      map(x => {
        return x.filter(y => y.pool == "B");
      })
    );

    this.obsAvailable = this.afsMembers.pipe(
      map(x => {
        return x.filter(y => (y.pool == "X"));
      })
    );

    //****************************************
    //converting observable to array, but it will not show unless async loading is done.
    this.obsPoolA.subscribe(x => {
      this.poolA = x as Member[];
      this.numberOfPoolA = this.poolA.length;
    });

    this.obsPoolB.subscribe(x => {
      this.poolB = x as Member[];
      this.numberOfPoolB = this.poolB.length;
    });

    this.obsAvailable.subscribe(x => {
      this.availableMembers = x as Member[];
    })


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

    this.btnPressCount++;

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
    config.duration = 3000;
    this.snackBar.open(message, action, config);
  }

  // getMembers() {
  //   this.members = [];
  //   this.rest.getMembers().subscribe((data: {}) => {
  //     this.members = data;

  //     this.availableMembers = this.members.filter(function(x) {
  //       return x.pool == "X";
  //     });

  //     this.poolA = this.members.filter(function(x) {
  //       return x.pool == "A";
  //     });

  //     this.poolB = this.members.filter(function(x) {
  //       return x.pool == "B";
  //     });

  //     this.numberOfPoolA = this.poolA.length;
  //     this.numberOfPoolB = this.poolB.length;
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

    this.btnPressCount = 0;
  }
}
