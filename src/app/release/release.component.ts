import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {
  @Input() name: string="";
  @Input() image: string="";
  @Input() release_date: string="";
  @Input() total_tracks:number=0;
  @Input() artists:any;
  @Input() releaseId:any;
  @Input() artistId:any;
  constructor() { }

  ngOnInit(): void {
  }

}
