import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent  {

  artistas: any[] = [];
  loading: boolean;


  constructor( private spotify: SpotifyService) { }


  async buscar(termino:string) {
    (await this.spotify.getArtistas(termino))
     .subscribe((data: any) => {
      this.loading = false;
      this.artistas = data;
     })
  }

}
