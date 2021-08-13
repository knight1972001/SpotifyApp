import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  favouritesList: Array<any>=[];

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient, private auth: AuthService) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums`, {  headers: {"Authorization": `Bearer ${token}`}, params: { 
        include_groups: "album,single",
        limit: 50
       }});
    }));
  }

  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?query=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` }});
    }));
  }

  // getFavourites(): Observable<any> {
  //   if(this.favouritesList.length > 0){
  //     return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
  //       return this.http.get<any>(`https://api.spotify.com/v1/tracks`, { headers: { "Authorization": `Bearer ${token}` }, params:{
  //         ids: this.favouritesList.join(',')
  //       }});
  //     }));
  //   }else{
  //     return new Observable(o=>{o.next([])});
  //   }
  // }

  // addToFavourites(id):boolean {
  //   if(id === undefined || id === null || this.favouritesList.length >= 50 || this.favouritesList.includes(id)){
  //     return false;
  //   }else{
  //     this.favouritesList.push(id);
  //     return true;
  //   }
  // }

  // removeFromFavourites(id): Observable<any> {
  //   if(this.favouritesList.includes(id)){
  //     let index=this.favouritesList.indexOf(id);
  //     if(index > -1){
  //       this.favouritesList.splice(index, 1);
  //     }else{
  //       console.log("Failed to remove");
  //     }
  //   }else{
  //     console.log("Failed to remove");
  //   }
  //   return this.getFavourites();
  // }

  // addToFavourites(id): Observable<[String]> {
  //   let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), Authorization: `JWT ${this.auth.getToken()}, "Access-Control-Allow-Origin": "*"` };
  //   console.log(this.auth.getToken())
  //   console.log(id);
  //   return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, null, httpOptions);
  // }

  checkExist(): Observable<[string]> {
    return this.http.get<[string]>(`${environment.userAPIBase}/favourites/`, {headers: {"Authorization": `JWT ${this.auth.getToken()}`}})
  }

  addToFavourites(id): Observable<[String]> {
    return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, null, {headers: {"Authorization": `JWT ${this.auth.getToken()}`}});
  }
  
  removeFromFavourites(id): Observable<[String]> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`, {headers: {"Authorization": `JWT ${this.auth.getToken()}`}}).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      return this.getFavourites();
    }));
  }
  
  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`, {headers: {"Authorization": `JWT ${this.auth.getToken()}`}}).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if (favouritesArray.length > 0) {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
          return this.http.get<SpotifyApi.MultipleTracksResponse>(`https://api.spotify.com/v1/tracks`, {
            headers: { "Authorization": `Bearer ${token}` }, params: {
              ids: favouritesArray.join(',')
            }
          });
        }));
      } else {
        return new Observable(o => { o.next([]); });
      }
    }));
  }

}