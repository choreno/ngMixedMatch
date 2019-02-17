import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RestService } from "./rest.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "title will be here ...";
  members: any = [];

  constructor(private rest: RestService) {}

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.members = [];
    this.rest.getMembers().subscribe((data: {}) => {
      console.log(data);
      this.members = data;
    });
  }




  
}
