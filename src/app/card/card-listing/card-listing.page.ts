import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../shared/card.service';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { ToastService } from 'src/app/shared/service/toast.service';
import { FavoriteCardStore} from '../shared/card-favorite.store';
import { Subscription } from 'rxjs';
import { Card } from '../shared/card.model';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage implements OnInit {

  cardDeckGroup: string  = '';
  cardDeck: string  = '';
  cards: Card[] = [];
  copyOfCards: Card[] = [];
  isLoading: boolean = false;
  favoriteCards: any = {}
  favCardSubscription!:  Subscription;
  limit: number = 20;
  constructor(private route: ActivatedRoute,
     private cardService: CardService, 
     private loaderService: LoaderService,
     private toaster: ToastService,
     private favCardStore: FavoriteCardStore) {
      
    }
  
  ngOnInit() {
      this.favCardSubscription = this.favCardStore.favoriteCards.subscribe(
        (favCards:any)=>{
          this.favoriteCards = favCards
        }
      )
    }
  private async getCards(){
    await this.loaderService.presentLoading()
    this.cardService.getCardsByDeck(this.cardDeckGroup, this.cardDeck).subscribe(
      (cards: Card[])=>{
        this.cards = cards.map((card: Card)=>{
          card.text = this.cardService.replaceCardTextLine(card.text)
          card.favorite = this.iscardFavorite(card.cardId)
          return card;
        })
        this.copyOfCards = Array.from(this.cards)
        this.loaderService.dismissLoading()
      },()=> {
        this.loaderService.dismissLoading()
        this.toaster.presentErrorToast("card could not be loaded, let's try to refresh page")
      })
  }
  private iscardFavorite(cardId: string): boolean {
    const card = this.favoriteCards[cardId]
    return card ? true : false;
  }
  ionViewWillEnter(){
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup') || '';
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck') || '';
    if(this.cards && this.cards.length === 0) this.getCards()
  }
  ionViewDidLeave(){
    if(this.favCardSubscription && !this.favCardSubscription.closed){
      this.favCardSubscription.unsubscribe()
    }
  }
  handleRefresh(event:any){
    this.getCards()
    event.target.complete()
  }
  hydrateCards(cards:Card[]){
    this.cards = cards;
    this.isLoading = false;
  }
  handleSearch(){
    this.isLoading = true;
  }

  favoriteCard(card: Card){
    this.favCardStore.toggleCards(card)
  }

  onIonInfinite(infiniteScroll:any){
    setTimeout(()=>{
      this.limit = this.limit + 20
      infiniteScroll.target.complete();
    }, 200)
  }
}
