import { Component, OnInit } from '@angular/core';
import { find } from 'rxjs';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  isShowing = true
  ngOnInit(): void {
   console.log("running first page")
  }

}
