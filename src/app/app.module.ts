import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { NewItem } from '../pages/new-item/new-item';
import { PopoverPage } from '../pages/item-details/PopoverPage';
import { PersistenceApi } from "./shared/persistence.service";
import { StockItemPage } from "../pages/stock-item/stock-item";

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    StockItemPage,
    NewItem,
    PopoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    StockItemPage,
    NewItem,
    PopoverPage
  ],
  providers: [PersistenceApi]
})
export class AppModule {}
