import {Component, OnInit} from '@angular/core'
import {LockerService} from '../../../shared/service/locker'
import {Router} from '@angular/router'

import {ArticleCardService} from './article-card.service'
import {List} from './list'

@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss'],
    providers: [ArticleCardService]
})
export class ArticleCardComponent implements OnInit {

    constructor (
        private articleCardService: ArticleCardService,
        private locker: LockerService,
        private router: Router,
    ){
    }

    public list: List[]
    private user: any

    getList(id) {
        this.articleCardService.getList(id)
            .subscribe(
                list => this.list = list,
                error => {
                    console.log(error);
                }
            )
    }
    goNext (path){
        this.router.navigate(['/articles/list', path])
    }

    ngOnInit() {
        this.user = this.locker.get('user')
        if (!this.user|| !this.user.id){
            return this.router.navigate(['/welcome'])
        }
        this.getList(this.user.id)
    }

}
