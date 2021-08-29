import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BotDetectCaptchaModule } from 'angular-captcha'; 
import { AppComponent } from './app.component';
//import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestCache, RequestCacheWithMap } from './Services/request-cache.service';
import { httpInterceptorProviders } from './interceptor/index';
import { HttpModule } from './http.module'
import { AuthenticationModule} from './modules/authentication/authentication.module';
//import {LayoutModule} from './modules/layout/layout.module';
import {BuyermoduleModule} from './modules/buyermodule/buyermodule.module';
import {SellermoduleModule} from './modules/sellermodule/sellermodule.module';
import { NgxCaptchaModule } from 'ngx-captcha';
import {HeaderComponent} from './modules/layout/header/header.component';
import {FooterComponent} from './modules/layout/footer/footer.component';
import { HomeComponent,FormatTimePipe } from './modules/layout/home/home.component';
import { TimerPipe } from './pipes/timer.pipe';
import { environment } from '../environments/environment.prod';
import { PhonemaskDirective } from './directive/phonemask.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    //PageNotFoundComponentComponent,
    HomeComponent,
    TimerPipe,  
    FormatTimePipe,
    PhonemaskDirective
    
  ],
  exports: [
    PhonemaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthenticationModule,
    BuyermoduleModule,
    SellermoduleModule,
    NgxCaptchaModule,
    HttpModule.forRoot({ environment }),
    BotDetectCaptchaModule.forRoot({
      captchaEndpoint: 'captcha-endpoint/simple-botdetect.php'
    })
    //LayoutModule
  ],
  
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: RequestCacheWithMap, multi: true },
    //httpInterceptorProviders
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
