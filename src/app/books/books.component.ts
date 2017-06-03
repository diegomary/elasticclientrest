
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { BookService } from '../services/bookservice';
import $ from 'jquery/dist/jquery'

@Component({
  selector: 'app-books',
  providers: [BookService],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  constructor(private bookservice: BookService) { this.books= []; }
  books: Array<any>;

  ngAfterViewInit(){}
  ngOnInit() {
      this.bookservice.getBooks().subscribe(data => this.books = data, function error(err) { console.error('Error: ' + err)},
      () => console.log('Books Loaded!'));
  }

}
