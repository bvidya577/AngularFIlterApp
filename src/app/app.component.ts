import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  baseApiUrl: string = 'https://api.spaceXdata.com/v3/launches/';
  noData: boolean = false;
  dataList = [];
  yearVal: any = false;
  launchVal: any = false;
  landVal: any = false;
  launchFlagVal: any = false;
  landFlagVal: any = false;
  year: string;
  yearStore = [];
  launchStore = [];
  landStore = [];
  yearChanged: string = 'notchanged';
  launchChanged: string = 'notchanged';
  landChanged: string = 'notchanged';
  constructor(public httpClient: HttpClient) {}
  ngOnInit() {
    this.defaultData();
  }
  defaultData() {
    let params = new HttpParams().set('limit', '100'); //.set('launch_year', '2000')
    this.httpClient
      .get(this.baseApiUrl, { params: params })
      .subscribe((res: any) => {
        res == '' ? (this.noData = true) : (this.noData = false),
          (this.dataList = [...res]);
      });
  }
  filter(event: { target: any; currentTarget: any }) {
    var target = event.target || event.currentTarget;
    var y = target.value;
    var x = target.getAttribute('data-id');
    if (x == 'year') {
      this.yearChanged = 'changed';
      this.year = y;
      target.classList.add('green');
      target.classList.remove('light');
      this.yearStore.push(y);
      if (this.yearStore.length == 2) {
        if (this.yearStore[0] == this.yearStore[1]) {
          this.yearVal = !this.yearVal ? true : false;
          if (this.yearVal == true) {
            this.yearChanged = 'notchanged';
            target.classList.add('light');
            target.classList.remove('green');
          } else {
            this.yearChanged = 'changed';
            target.classList.add('green');
            target.classList.remove('light');
          }
        } else {
          this.yearChanged = 'changed';
          this.yearVal = false;
          var a = document.querySelectorAll('[data-id=year]');
          for (var i in a)
            if (a.hasOwnProperty(i)) {
              a[i].classList.remove('green');
              a[i].classList.add('light');
            }
          target.classList.add('green');
          target.classList.remove('light');
        }
        this.yearStore.shift();
      }
    }
    if (x == 'launchProgram') {
      this.launchChanged = 'changed';
      this.launchVal = y == 'true' ? true : false;
      target.classList.add('green');
      target.classList.remove('light');
      this.launchStore.push(y);
      if (this.launchStore.length == 2) {
        if (this.launchStore[0] == this.launchStore[1]) {
          this.launchFlagVal = !this.launchFlagVal ? true : false;
          if (this.launchFlagVal == true) {
            this.launchChanged = 'notchanged';
            target.classList.add('light');
            target.classList.remove('green');
          } else {
            this.launchChanged = 'changed';
            target.classList.add('green');
            target.classList.remove('light');
          }
        } else {
          this.launchChanged = 'changed';
          this.launchFlagVal = false;
          var a = document.querySelectorAll('[data-id=launchProgram]');
          for (var i in a)
            if (a.hasOwnProperty(i)) {
              a[i].classList.remove('green');
              a[i].classList.add('light');
            }
          target.classList.add('green');
          target.classList.remove('light');
        }
        this.launchStore.shift();
      }
    }
    if (x == 'landProgram') {
      this.landChanged = 'changed';
      this.landVal = y == 'true' ? true : false;
      target.classList.add('green');
      target.classList.remove('light');
      this.landStore.push(y);
      if (this.landStore.length == 2) {
        if (this.landStore[0] == this.landStore[1]) {
          this.landFlagVal = !this.landFlagVal ? true : false;
          if (this.landFlagVal == true) {
            this.landChanged = 'notchanged';
            target.classList.add('light');
            target.classList.remove('green');
          } else {
            this.landChanged = 'changed';
            target.classList.add('green');
            target.classList.remove('light');
          }
        } else {
          this.landChanged = 'changed';
          this.landFlagVal = false;
          var a = document.querySelectorAll('[data-id=landProgram]');
          for (var i in a)
            if (a.hasOwnProperty(i)) {
              a[i].classList.remove('green');
              a[i].classList.add('light');
            }
          target.classList.add('green');
          target.classList.remove('light');
        }
        this.landStore.shift();
      }
    }
    this.dataList = [];
    if (
      this.yearChanged == 'notchanged' &&
      this.launchChanged == 'changed' &&
      this.landChanged == 'notchanged'
    ) {
      let obj = { limit: '100', launch_success: this.launchVal };
      this.httpClient
        .get(this.baseApiUrl, { params: obj })
        .subscribe((res: any) => {
          res == '' ? (this.noData = true) : (this.noData = false),
            (this.dataList = [...res]);
        });
    }
    if (
      this.yearChanged == 'notchanged' &&
      this.launchChanged == 'changed' &&
      this.landChanged == 'changed'
    ) {
      let obj = {
        limit: '100',
        launch_success: this.launchVal,
        land_success: this.landVal,
      };
      this.httpClient
        .get(this.baseApiUrl, { params: obj })
        .subscribe((res: any) => {
          res == '' ? (this.noData = true) : (this.noData = false),
            (this.dataList = [...res]);
        });
    }
    if (
      this.yearChanged == 'changed' &&
      this.launchChanged == 'changed' &&
      this.landChanged == 'changed'
    ) {
      let obj = {
        limit: '100',
        launch_year: this.year,
        launch_success: this.launchVal,
        land_success: this.landVal,
      };
      this.httpClient
        .get(this.baseApiUrl, { params: obj })
        .subscribe((res: any) => {
          res == '' ? (this.noData = true) : (this.noData = false),
            (this.dataList = [...res]);
        });
    }
    if (
      this.yearChanged == 'notchanged' &&
      this.launchChanged == 'notchanged' &&
      this.landChanged == 'notchanged'
    ) {
      this.defaultData();
    }
  }
  ngOnDestroy() {}
}
