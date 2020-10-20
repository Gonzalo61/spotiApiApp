import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

 // IMPORT EL MAP PARA MANEJO DE INFORMACION DE LA API
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  
  constructor( private http: HttpClient) { 
    

    console.log("Spotify listo para usarse");
  }

  getToken() {
    
    const url = 'https://spotifyapp-get-token-master.herokuapp.com/spotify/9b6e75fb0ba8473a900b2c47ecc72507/3bdb7f815f514a0ba5b94962de8df399';
      const prom = this.http.get(url).toPromise().then((data: any) => data.access_token);

      return prom;

  }
  
  async getQuery( query:string ){


    let token = await this.getToken();

    
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });

    
    const url =`https://api.spotify.com/v1/${query}`;

    return this.http.get(url, { headers });

  }

  async getNewReleases() {
    const obs = await this.getQuery('browse/new-releases?limit=20');
    return obs.pipe(map((data: any) => data.albums.items));
 }


  async getArtistas( termino:string ){
    
    const obs = await this.getQuery(`search?q=${ termino }&type=artist&limit=15`);
    return obs.pipe(map((data: any) => data['artists'].items));

   };

  async getArtista( id:string ){

    const obs = await this.getQuery(`artists/${id}`);
    return obs.pipe(map((data: any) => {
      return data;
    }));

  }

  async getCanciones( id:string ){
    const obs = await this.getQuery(`artists/${id}/top-tracks?country=us`);
    return obs.pipe(map((data: any) => { return data['tracks'];}));
  }
}
