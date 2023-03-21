import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DoughnutData } from './doughnut-data';
import * as d3 from 'd3';


@Injectable({
  providedIn: 'root'
})
export class D3ServiceService {

  public d3 = d3;

  constructor() { }

}
