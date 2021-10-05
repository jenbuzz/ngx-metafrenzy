[![Coverage Status](https://coveralls.io/repos/github/jenbuzz/ngx-metafrenzy/badge.svg?branch=master)](https://coveralls.io/github/jenbuzz/ngx-metafrenzy?branch=master)

# ngx-metafrenzy

This angular module will provide help in dynamically setting the head-tags such as meta/link/title. It works with **server-side rendering**!

## Requirements

- Angular 12+

Older versions of Angular:
- use v6.0.0 for Angular 10
- use v5.1.0 for Angular 9
- use v4.1.0 for Angular 8
- use v3.2.0 for Angular 7
- use v2.4.1 for Angular 6

## Installation

```bash
$ npm install ngx-metafrenzy
```
or
```
$ yarn add ngx-metafrenzy
```

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

When navigating between routes you can also add "canDeactivate" to the data object. This will try to reset the metatags, which were set in the previous route. Use this with caution as you might remove tags, which should be global or not removed. See remove-functions in the service class to remove single tags.
```
...
    canDeactivate: [MetafrenzyGuard],
...
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

As shown above the title can be set using setTitle and a meta tag using setMetaTag with the content as parameters. The link tag is a little different since you pass an object to match all possible variations of attributes on the link tag. Properties in this link object could be:

``charset, crossorigin, href, hreflang, media, rel, rev, sizes, target, type``

### Service class functions
```typescript
// Set title tag
setTitle('')

// Returns the current title as a string
getTitle()

// Set meta tag from specified name and content
setMetaTag('')

// Returns the content value of a metatag matching the selector
getMetaTag('')

// Remove a single meta tag (eg. removeMetaTag('name="test"'))
removeMetaTag('')

// Set the value of meta charset
setMetaCharsetTag('')

// Set link tag from specified object
setLinkTag({
    charset: '';
    crossorigin: '';
    href: '';
    hreflang: '';
    media: '';
    rel: '';
    rev: '';
    sizes: '';
    target: '';
    type: '';
})

// Remove link tags
removeLinkTags(() => true);

// Set title tag and og:title to the same value
setAllTitleTags('')

// Set meta description and og:description to the same value
setAllDescriptionTags('')

// Set canonical url
setCanonical('')

// Set robots tag
setRobots('')

// Set all open graph tags
setOpenGraph({
    title: '', 
    description: '',
    type: '',
    url: '',
    image: '',
    site_name: ''
});

// Set multiple tags with one call
setTags({
    title: '', // setting title and og:title
    description: '', // setting meta description and og:description
    url: '', // setting canonical and og:url
    robots: '', // setting robots
    image: '' // setting og:image:url
});
```

## Docker

For development in a docker container run:

```
$ docker-compose up --build -d
```

And go to http://localhost:4200

## License
This package is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
