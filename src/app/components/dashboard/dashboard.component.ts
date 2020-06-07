import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import MediumEditor from 'medium-editor';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.sass'
  ]
  
})
export class DashboardComponent implements OnInit {
  editor: any;
  constructor(public auth: AuthenticationService, private userdb: UserService) {
    
  }

  ngOnInit(): void {
    
  }
  @ViewChild('editable',{static: true}) editable: ElementRef;

  ngAfterViewInit() {
    this.editor = new MediumEditor(this.editable.nativeElement);
    this.editor.subscribe('editableInput', function (eventObj, editable) {
      var text = editable.innerHTML; // getContent() returns the content of the editor as well
      console.log(text);
    });

  }
  signOut(): void{
    console.log("signout called");
    console.log(this.editor.getContent());
    this.auth.SignOutSave(this.editor.getContent());
  }

}
