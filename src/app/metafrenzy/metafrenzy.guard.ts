import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MetafrenzyService, LinkDefinition } from './metafrenzy.service';

@Injectable()
export class MetafrenzyGuard implements CanActivate, CanActivateChild {
    constructor(private readonly metafrenzyService: MetafrenzyService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const metaTags = (next && next.data && next.data.metafrenzy) ? next.data.metafrenzy : null;

        if (metaTags) {
            for (const key in metaTags) {
                if (!metaTags.hasOwnProperty(key)) {
                    continue;
                }

                const value = metaTags[key];

                if (key === 'title') {
                    this.metafrenzyService.setTitle(value);
                } else if (key === 'tags') {
                    value.forEach((tag: any) => {
                        if ('name' in tag && 'content' in tag) {
                            this.metafrenzyService.setMetaTag(tag.name, tag.content);
                        }
                    });
                } else if (key === 'links') {
                    value.forEach((link: LinkDefinition) => {
                        this.metafrenzyService.setLinkTag(link);
                    });
                }
            }
        }

        return true;
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.canActivate(next, state);
    }
}
