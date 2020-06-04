import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import MediumEditor from 'medium-editor';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.sass'
  ]
  
})
export class DashboardComponent implements OnInit {
  editor: any;
  constructor(public auth: AuthenticationService) { }

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
}
