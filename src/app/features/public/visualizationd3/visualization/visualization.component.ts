import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  constructor (){}

  ngOnInit(): void {

  }
  createBarChart():void{
    const data = [30, 200, 100, 400,150,250]
    const svg = d3.select("app-bar-chart").append("svg")
  }
}
