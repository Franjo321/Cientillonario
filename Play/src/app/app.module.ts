import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PuntosComponent } from './puntos/puntos.component';
import { PuntosService } from './puntos/puntos.service';

const routes: Routes = [
  {path: '', component: PuntosComponent},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PuntosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
