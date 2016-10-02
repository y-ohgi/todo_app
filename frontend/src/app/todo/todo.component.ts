import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
    selector: 'app-todo',
    providers: [TodoService],
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
    selecttodo: Todo;
    todos: Todo[];

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.fetchAll();
    }

    // todo選択時イベントリスナー
    onSelect(todo: Todo) {
        this.selecttodo = todo;
    }
    
    // 全件取得
    fetchAll(){
        this.todoService.fetchAll().then((todos) => this.todos = todos);
    }
}
