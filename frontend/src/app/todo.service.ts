import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

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
}
