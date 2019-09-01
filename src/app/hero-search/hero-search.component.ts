import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // 等待新字符串输入时间
      debounceTime(300),
      // 只有改变时发送请求
      distinctUntilChanged(),
      // 对每一个term调用搜索查询
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    )
  }

  search(term: string): void {
    this.searchTerms.next(term)
  }

}
