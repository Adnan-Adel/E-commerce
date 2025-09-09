import { FlowbiteService } from './core/services/flowbite/flowbite';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { FooterComponent } from "./layout/footer/footer.component";

import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

import { TranslatePipe, TranslateDirective, TranslateService } from '@ngx-translate/core';
import { PlatformService } from './core/services/platform/platform.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // protected readonly title = signal('ecommerce');
  protected readonly title = signal('ngx-translate-demo-standalone');
  private ngxSpinnerService: NgxSpinnerService = inject(NgxSpinnerService);
  private translate = inject(TranslateService);
  private platform = inject(PlatformService);
  
  lang : string|null = null;

  constructor(private FlowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (this.platform.checkPlatformBrowser()) {
      this.lang = localStorage.getItem('lang');
      if (this.lang) {
        this.translate.use(this.lang);

        if(this.lang == "en") {
          document.body.dir = "ltr";
        }
        else if(this.lang == "ar") {
          document.body.dir = "rtl";
        }
      }
    }
  }


}
