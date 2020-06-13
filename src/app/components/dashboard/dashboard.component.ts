import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import MediumEditor from 'medium-editor';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user'

import { timer, Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscription } from 'rxjs';
import { switchMap, filter, scan, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.sass'
  ]
  
})


export class DashboardComponent implements OnInit {
  editor: any;
  countDown: any = timer(0, 1500);
  time: number = 100;

  constructor(public auth: AuthenticationService, private userdb: UserService) {
    
  }

  ngOnInit(): void {
    
  }
  @ViewChild('editable',{static: true}) editable: ElementRef;

  
  ngAfterViewInit() {
    this.editor = new MediumEditor(this.editable.nativeElement);
    const reset = () => {
      this.time = 0;
    }
    this.editor.subscribe('editableInput', function (eventObj, editable) {
      var text = editable.innerHTML; // getContent() returns the content of the editor as well
      console.log(text);
      //this.countDown.repeat();
      reset();
      
    })
    //timer system so that we dont sync database data on EVERY keystroke.
    // when the user stops typing for 1.2 seconds, then we update.
    setInterval(() => {
      this.time++;
      if (this.time == 6){
        this.auth.Save(this.editor.getContent());
      }
    }, 200);

    console.log(this.auth.data);
    this.editor.setContent(this.auth.data);
  }

  signOut(): void{
    console.log("signout called");
    console.log(this.editor.getContent());
    this.auth.SignOutSave(this.editor.getContent());
  }
}
