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

    // todo追加
    postTodo(title: string, body: string){
        this.todoService.postTodo(title, body)
            .then((todo) => this.todos.push(todo));
    }

    // todo削除
    deleteTodo(todo){
        this.todoService.deleteTodo(todo)
            .then(()=>{
                this.todos.splice(this.todos.indexOf(todo), 1);
            });
    }

    // todo更新
    updateTodo(){
        this.todoService.updateTodo(this.selecttodo)
            .then((todo) => this.todos[(this.todos.indexOf(todo))] = todo);
    }
}
