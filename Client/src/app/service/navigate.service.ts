import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class NavigateService {
    constructor(private router: Router) { }
    navigatePage(url: string) {
        this.router.navigateByUrl(url)
    }
}