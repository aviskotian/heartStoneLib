import { Component, OnInit } from '@angular/core';
import { FavoriteCardStore} from '../shared/card-favorite.store';
import { Subscription } from 'rxjs';
import { Card } from '../shared/card.model';

@Component({
  selector: 'app-card-favorite',
  templateUrl: './card-favorite.page.html',
  styleUrls: ['./card-favorite.page.scss'],
})
export class CardFavoritePage implements OnInit {
  favCardSubscription!:  Subscription;
  favoriteCardList: Card[] = []
  constructor( private favCardStore: FavoriteCardStore) { }

  ngOnInit() {
    this.favCardSubscription = this.favCardStore.favoriteCards.subscribe(
      (favCards:any)=>{
        this.favoriteCardList = this.getFavoriteCardList(favCards)
      }
    )
  }

  ionViewDidLeave(){
    if(this.favCardSubscription && !this.favCardSubscription.closed){
      this.favCardSubscription.unsubscribe()
    }
  }

  private getFavoriteCardList(favoriteCards: any): Card[] {
    if (favoriteCards) {
      return Object.keys(favoriteCards)
        .filter(key => favoriteCards[key])
        .map(key => favoriteCards[key])
    }

    return [];
  }

}
