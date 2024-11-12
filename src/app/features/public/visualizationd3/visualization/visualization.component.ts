import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {  
  // $event:EventTarget | undefined
  // private data = [
  //   {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
  //   {"Framework": "React", "Stars": "150793", "Released": "2013"},
  //   {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
  //   {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
  //   {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  // ];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors:any;
  private dataSets:any;
  isClicked:boolean = false;
  status:string = '';


  constructor (){}

  ngOnInit(): void {
    this.isClicked = true;
    this.loadDataFromCsv();
    setTimeout(() => {
      this.createSvgPie();
      this.createColors();
      this.drawChart();
      this.isClicked = false;
      this.status = 'Pie Chart'
    }, 1000);
  }

  showVisualizationOfData(event:any) {
    d3.select("figure#bar").html('');
    d3.select("figure#pie").html('');
    const targetValue = event.target.value
    if(targetValue === 'pie'){
      this.isClicked = true;
      this.loadDataFromCsv();
      setTimeout(() => {
        this.createSvgPie();
        this.createColors();
        this.drawChart();
        this.isClicked = false
        this.status = 'Pie Chart'
      }, 1000);
    }
    else if(targetValue === 'bar'){
      this.isClicked = true;
      this.loadDataFromCsv();
      setTimeout(() => {
        this.createSvgBar()
        this.createColors()
        this.drawBars(this.dataSets)
        this.isClicked=false;
        this.status = 'Bar Graph';
      }, 1000);
    }
    }

private loadDataFromCsv(): void {
  d3.csv('../../../../../assets/data/revenues.csv').then((data:any) => {
    data.forEach((d:any) => {
      d['revenue'] = Number(d['revenue'])
      d['profit'] = Number(d['profit'])
    });
    this.dataSets = data
    console.log(this.dataSets, "====")
  })
}

  private createSvgBar(): void {
      // d3.select("figure#bar").empty();
      this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private createSvgPie(): void {
    // d3.select("figure#pie").empty();
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width*2)
    .attr("height", this.height*2)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.dataSets.map((d:any) => d.profit))
    .range(["grey", "skyblue", "brown", "#677795", "#5a6782", "red", "blue", "grey", "white", "yellow", "pink"]);
}


  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.month))
    .padding(0.2);
  
    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
  
    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 100000])
    .range([this.height, 0]);
  
    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));
  
    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.month))
    .attr("y", (d: any) => y(d.revenue), (d:any)=>y(d.profit))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.revenue))
    .attr("fill", "green", "red")
    .attr("fill-opacity", 1)
    .transition(d3.transition().duration(500))
      .attr("y", (d:any) => y(d.revenue))
      .attr("fill-opacity", 1)    
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.revenue));
  
    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.dataSets))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");
  
    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(150)
    .outerRadius(this.radius);
  
    this.svg
    .selectAll('pieces')
    .data(pie(this.dataSets))
    .enter()
    .append('text')
    .text((d: any)=> d.data.month)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }
}
