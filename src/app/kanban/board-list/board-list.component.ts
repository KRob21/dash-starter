import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { Board } from '../../models/board.model';
@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})
export class BoardListComponent implements OnInit {
  constructor(private boardService: BoardService) {}

  ngOnInit(): void {}

  createBoard(data: Board) {
    console.log('create board');
    this.boardService.createBoard(data);
  }
}
