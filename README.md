# ngx-metafrenzy

This angular module will provide help in dynamically setting the head-tags such as meta/link/title.

## Requirements

- Angular 5+

## Installation

``npm install --save ngx-metafrenzy``

## Usage

Setup the NgModule first. Always import MetafrenzyModule. Import MetafrenzyGuard if you want to use the guard functionality. See the data section in the example below for more on the syntax.

```typescript
import { MetafrenzyModule, MetafrenzyGuard } from 'ngx-metafrenzy';

@NgModule({
    declarations: [AppComponent],
    imports: [
        ...
        MetafrenzyModule.forRoot(),
        RouterModule.forRoot([
            {
                path: '',
                component: AppComponent,
                canActivate: [MetafrenzyGuard],
                data: { 
                    metafrenzy: {
                        title: 'My Title',
                        tags: [
                            {
                                name: 'og:title',
                                content: 'My title'
                            }, {
                                name: 'og:description',
                                content: 'My description'
                            }
                        ],
                        links: [
                            {
                                rel: 'canonical',
                                href: 'http://localhost/'
                            }
                        ]
                    }
                }
            }
        ])
        ...
    ],
    ...
})
```

You can use the service class MetafrenzyService in any component. See example below:

```typescript
import { MetafrenzyService } from 'ngx-metafrenzy';

@Component({
    ...
})
export class AppComponent {

    constructor(private readonly metafrenzyService: MetafrenzyService) {
        this.metafrenzyService.setTitle('My title');

        this.metafrenzyService.setMetaTag('og:title', 'My title');

        this.metafrenzyService.setLinkTag({
            rel: 'canonical',
            href: 'http://localhost/'
        });
    }

}
```

As shown the title can be set using setTitle and a meta tag using setMetaTag with the content as parameters. The link tag is a little different since you pass an object to match all possible variations of attributes on the link tag:

``charset, crossorigin, href, hreflang, media, rel, rev, sizes, target, type``

### Service class functions
```typescript
setTitle() // Set title tag
getTitle() // Returns the current title as a string
setMetaTag() // Set meta tag from specified name and content
getMetaTag() // Returns the content value of a metatag
setMetaCharsetTag() // Set the value of meta charset
setLinkTag() // Set link tag from specified object
setAllTitleTags() // Set title tag and og:title to the same value
setAllDescriptionTags() // Set meta description and og:description to the same value
```
