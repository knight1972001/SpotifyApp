import { Component, OnInit } from '@angular/core';
import {MusicDataService} from '../music-data.service'
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any;
  artists: any;
  searchQuery:any;
  private liveData:any;
  id:any;
  searchString:string;



  constructor(private dataService: MusicDataService, private route: ActivatedRoute,  private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.searchQuery=this.route.snapshot.queryParams['searchQuery'];
    if(!(this.searchQuery=="")) {
      this.liveData=this.dataService.searchArtists(this.searchQuery).subscribe(data=>{
        this.artists=data.artists.items;
        this.results=this.artists.filter(artist => artist.images.length > 0)
        if(this.results.length===0){
          this.snackBar.open("No results found...", "", { duration: 1500 });
          this.results=null;
        }else{
          this.snackBar.open("Found ", this.results.length+" results", { duration: 1500 });
        }
        });
      }
  }
}
