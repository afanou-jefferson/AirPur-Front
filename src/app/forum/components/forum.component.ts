import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  rubriqueOne = 'mon premier rubrique';
  rubriqueTwo = 'mon deuxieme rubrique';
  rubriqueTree = 'mon troisieme';

  constructor() { }

  ngOnInit() {
  }

}
