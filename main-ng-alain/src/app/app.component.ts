import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TitleService, VERSION as VERSION_ALAIN } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';
import { initGlobalState, registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'micro-fronend-main',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
  ) {
    renderer.setAttribute(el.nativeElement, 'ng-alain-version', VERSION_ALAIN.full);
    renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);
  }

  ngOnInit() {
    this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd)).subscribe(() => {
      this.titleSrv.setTitle();
      this.modalSrv.closeAll();
    });
    //
    this.registerMicroApps();
    setDefaultMountApp('/app-esl');
    start();
    runAfterFirstMounted(() => {
      console.log('[MainApp] first app mounted');
    });
  }

  registerMicroApps() {
    registerMicroApps(
      [
        {
          name: 'angular9',
          entry: '//localhost:7103',
          container: '#subapp-viewport',
          activeRule: '/angular9',
        },
        {
          name: 'app-esl',
          entry: '//test.sifei.info/app-esl/',
          container: '#subapp-viewport',
          activeRule: '/app-esl',
        },
        {
          name: 'subapp-ng-alain',
          entry: '//test.sifei.info/subapp-ng-alain/',
          container: '#subapp-viewport',
          activeRule: '/subapp-ng-alain',
        },
      ],
      {
        beforeLoad: [
          (app) => {
            console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
            return Promise.resolve();
          },
        ],
        beforeMount: [
          (app) => {
            console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            return Promise.resolve();
          },
        ],
        afterUnmount: [
          (app) => {
            console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            return Promise.resolve();
          },
        ],
      },
    );
  }
}
