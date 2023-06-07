import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TablesViewComponent } from './views/tables-view/tables-view.component';
import { TablesFormComponent } from './components/tables-form/tables-form.component';
import { TransitionComponent } from './components/transition/transition.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TablesViewComponent,
    TablesFormComponent,
    TransitionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
