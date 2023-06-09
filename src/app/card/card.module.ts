import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CardDeckPage } from './card-deck/card-deck.page';
import { CardService } from './shared/card.service'
import { LoaderService } from '../shared/service/loader.service';
import { ToastService } from '../shared/service/toast.service';
import { AlertService } from '../shared/service/alert.service';
import { CardListComponent } from './components/card-list.component';
import { CardListingPage } from './card-listing/card-listing.page';
import { CardDetailPage } from './card-detail/card-detail.page';
import { SearchComponent } from '../shared/components/search.component';
import { FavoriteCardStore } from './shared/card-favorite.store';
import { CardFavoritePage } from './card-favorite/card-favorite.page';
@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        HttpClientModule,
        RouterModule
    ],
    providers: [
        CardService,
        LoaderService,
        ToastService,
        AlertService,
        FavoriteCardStore
    ],
    declarations: [
        CardDeckPage,
        CardListComponent,
        CardListingPage,
        CardDetailPage,
        SearchComponent,
        CardFavoritePage
    ]
})

export class CardPageModule{}