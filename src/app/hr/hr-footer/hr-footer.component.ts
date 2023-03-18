import { Component, OnInit } from '@angular/core';
import { faEnvelope, faPhoneAlt, faMapMarked } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hr-footer',
  templateUrl: './hr-footer.component.html',
  styleUrls: ['./hr-footer.component.scss']
})
export class HrFooterComponent implements OnInit {

  faEnvelope=faEnvelope;
  faPhoneAlt=faPhoneAlt;
  faMapMarked=faMapMarked;

  constructor() { }

  ngOnInit(): void {
  }

}
