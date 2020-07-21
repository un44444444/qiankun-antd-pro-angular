import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
})
export class CustomPageComponent implements OnInit {
  constructor(private http: _HttpClient) {}

  ngOnInit() {}
}
