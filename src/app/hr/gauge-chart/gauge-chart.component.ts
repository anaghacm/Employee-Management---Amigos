import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { D3ServiceService } from '../hr-services/d3-service.service';
import { DoughnutData } from '../hr-services/doughnut-data';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnInit {

  public leaveDetails!:any;
  public totalLeaveDays:number=0;

  public width = 300;
  public height = 250;
  public svg: any;
  public productivity = 0;

  constructor(private d3: D3ServiceService, private _api:ApiService) { }

  ngOnInit(): void {
    this.getAllLeaveDetails();
  }

  drawGauge() {

    let config = ({
      panel: {
        startAngle: -90,
        endAngle: 90,
        width: 40
      },
      sections: [
        { from: 0, to: 30, color: '#e8e2ca' },
        { from: 30, to: 60, color: '#dbd798' },
        { from: 60, to: 90, color: '#ccd360' },
        { from: 90, to: 120, color: '#aaca2a' },
        { from: 120, to: 150, color: '#3e6c0a' },
      ]
    });
    //Create SVG
    this.svg = this.d3.d3.select('#power-gauge')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)

    const minValue = Math.min(...config.sections.map((d: any) => d.from))
    const maxValue = Math.max(...config.sections.map((d: any) => d.to));

    const scale = this.d3.d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([
        config.panel.startAngle,
        config.panel.endAngle
      ]);

    const radius = Math.floor(Math.min(this.width, this.height) / 2) - 2;
    const arc = this.d3.d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - config.panel.width);

    const inner = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height * 0.75})`);

    const needle = inner
      .append('g')
      .attr('class', 'needle')
      .attr('fill', '#fff')
      .call((s: any) => s
        .append('circle')
        .attr('r', 9)
      )
      .call((s: any) => s
        .append('rect')
        .attr('x', -2)
        .attr('y', -this.height * .35)
        .attr('width', 4)
        .attr('height', this.height * .35)
      )
      .attr('transform', `rotate(scale(1))`)
      .transition()
      .ease(this.d3.d3.easeElastic.amplitude(2).period(0.2))
      .duration(3000)
      .attr('transform', `rotate(${scale(this.productivity * maxValue)})`);


    inner
      .selectAll('path.arc')
      .data(config.sections)
      .join('path')
      .attr('class', 'arc')
      .attr('d', (d: any) => arc(
        {
          innerRadius: radius,
          outerRadius: radius - config.panel.width,
          startAngle: this.deg2rad(scale(d.from)),
          endAngle: this.deg2rad(scale(d.to))
        }
      ))
      .attr('fill', (d: any) => d.color)

    this.svg.node();

  }

  deg2rad(deg: any) { return Math.PI / 180 * deg; }


  getAllLeaveDetails(){

    const date = new Date();
    let today:any;
    if(date.getMonth()+1 <10){
      today = date.getFullYear().toString()+ '-0' +(date.getMonth()+1).toString()+ '-' +date.getDate().toString()
    }
    else{
      today = date.getFullYear().toString()+ '-' +(date.getMonth()+1).toString()+ '-' +date.getDate().toString()
    }

    this._api.getApprovedLeaveDetails().subscribe((response)=>{
      this.leaveDetails=response;
      for(let leavedetail of this.leaveDetails){
        if(leavedetail.noofdays==1){
          this.totalLeaveDays+=1;
        }
        else{
          if(leavedetail.to<=today){
            this.totalLeaveDays+=leavedetail.noofdays;
          }
          else if(leavedetail.from<=today){
            let from=new Date(leavedetail.from)
            let nod=Math.ceil((date.getTime()-from.getTime()) / (1000 * 60 * 60 * 24));
            this.totalLeaveDays+=nod;
          }
        }
      }
      let totalWorkingDays = 132;
      this.productivity=((totalWorkingDays-this.totalLeaveDays)*9) / (totalWorkingDays*9);
      this.drawGauge();
    })
  }
}
