import { Component, Input, OnInit } from '@angular/core';
import { D3ServiceService } from '../hr-services/d3-service.service';
import { DoughnutData } from '../hr-services/doughnut-data'
import { entries } from "d3-collection";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-d3-doughnut',
  templateUrl: './d3-doughnut.component.html',
  styleUrls: ['./d3-doughnut.component.scss']
})
export class D3DoughnutComponent implements OnInit {
  private allUsers: any
  private activeEmp: number = 10;
  private inactiveEmp: number = 20;
  private data: DoughnutData[] = [
    { name: "active", value: this.activeEmp.toString(), color: "#FB8500" },
    { name: "inactive", value: this.inactiveEmp.toString(), color: "#219EBC" }
  ];

  private width = 300;
  private height = 300;
  private svg: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2;
  constructor(private d3: D3ServiceService, private _api: ApiService) {
    this.getCount();

  }

  ngOnInit(): void {
    this.createSvg();
    this.createColors(this.data);
    console.log(this.radius)
    this.drawChart();
  }

  getCount() {
    this._api.getAllUsers().subscribe((response) => {
      this.allUsers = response;
      for (let user of this.allUsers) {
        if (user.active == 1) {
          this.activeEmp += 1;
        }
        else if (user.active == 0) {
          this.inactiveEmp += 1;
        }
      }
      console.log(this.activeEmp, this.inactiveEmp)
    })
  }
  private createSvg(): void {
    this.svg = this.d3.d3
      .select("figure#donut")
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  private createColors(data: any): void {
    let index = 0;
    const defaultColors = [
      "#6773f1",
      "#32325d",
      "#6162b5",
      "#6586f6",
      "#8b6ced",
      "#1b1b1b",
      "#212121"
    ];
    const colorsRange: any = [];
    this.data.forEach(element => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = this.d3.d3
      .scaleOrdinal()
      .domain(data.map((d: any) => d.value.toString()))
      .range(colorsRange);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    var pie = this.d3.d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d: any) => {
        return d.value;
      });
    var data_ready = pie(this.data.map((d: any) => { return d }));

    // The arc generator
    var arc = this.d3.d3
      .arc()
      .innerRadius(this.radius * 0.4) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // // Another arc that won't be drawn. Just for labels positioning
    // var outerArc = this.d3.d3
    //   .arc()
    //   .innerRadius(this.radius * 0.9)
    //   .outerRadius(this.radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d: any) => this.colors(d.data.value))
      .attr("stroke", "transparent")
      .style("stroke-width", "1px")
      .style("opacity", 0.9);
  }
}
