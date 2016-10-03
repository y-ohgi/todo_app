import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/find';

import { Todo } from './todo';

@Injectable()
export class TodoService {
    private url: string = 'http://localhost:3000/todos';

    constructor(private http: Http) { }

    // 全件取得
    fetchAll(): Promise<Todo[]> {
        return Promise.resolve( this.http.get(this.url).toPromise()
                                .then(res =>res.json().map(todo => <Todo[]> todo)) );
    }

    // todo追加
    postTodo(title: string, body: string): Promise<Todo>{
        let params = JSON.stringify({
            'todo': {
                'title': title,
                'body': body
            }
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //TODO: 例外処理
        return this.http.post(this.url, params, options).toPromise()
            .then(res => res.json() as Todo);
    }

    // todo削除
    deleteTodo(todo): Promise<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.delete(this.url+"/"+todo["id"] , options).toPromise();
    }

    // todo更新
    updateTodo(todo): Promise<Todo>{
        let params = JSON.stringify({
            'todo': {
                'title': todo['title'],
                'body': todo['body']
            }
        });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.put(this.url+"/"+todo["id"], params, options).toPromise()
            .then(res => res.json() as Todo);
    }

}
