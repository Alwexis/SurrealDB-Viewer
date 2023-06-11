import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TransitionComponent } from './components/transition/transition.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QueryComponent } from './components/query/query.component';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { ConnectionsComponent } from './components/connections/connections.component';

const monacoConfig: NgxMonacoEditorConfig = {
  
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransitionComponent,
    WelcomeComponent,
    QueryComponent,
    ConnectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
