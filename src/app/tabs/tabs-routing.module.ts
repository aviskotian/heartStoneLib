import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CardDeckPage } from '../card/card-deck/card-deck.page'
import { CardListingPage } from '../card/card-listing/card-listing.page'; 
import { CardDetailPage } from '../card/card-detail/card-detail.page';
import { CardFavoritePage } from '../card/card-favorite/card-favorite.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'card',
        component: CardDeckPage
      },
      {
        path: 'card/:cardId',
        component: CardDetailPage
      },
      {
        path: 'card/:cardDeckGroup/:cardDeck',
        component: CardListingPage
      },
      {
        path: 'favorite',
        component: CardFavoritePage
      },
      {
        path: '',
        redirectTo: '/tabs/card',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/card',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
