import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Card } from './card.model';

@Injectable()
export class FavoriteCardStore{
    private _favoriteCardSubject = new BehaviorSubject({});

    constructor(private storage: Storage){
        this.storage.create().then(()=> this.loadInitialdata());
    }
    get favoriteCards(): Observable<any>{
        return this._favoriteCardSubject.asObservable();
    }
    private loadInitialdata(){
        this.storage.get('favoriteCards').then(
            (favCards) => {
                this._favoriteCardSubject.next(favCards || {});
            }
        )
    }

    public toggleCards(card: Card){
        const favCards:any = this._favoriteCardSubject.getValue()
        if(card.favorite){
            card.favorite = false;
            delete favCards[card.cardId]
          }else{
            card.favorite = true;
            favCards[card.cardId] = card;
          }
          this.storage.set('favoriteCards', favCards).then(()=>{
            this._favoriteCardSubject.next(favCards);
          })

    }
}