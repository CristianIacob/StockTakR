import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { NewItem } from '../pages/new-item/new-item';
import { PersistenceApi } from "./shared/persistence.service";
import { StockItemPage } from "../pages/stock-item/stock-item";

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    StockItemPage,
    NewItem
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    StockItemPage,
    NewItem
  ],
  providers: [PersistenceApi]
})
export class AppModule {}
