import { Injectable, RendererFactory2, Inject, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface LinkDefinition {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    type?: string;
    [prop: string]: string;
}

export interface OpenGraph {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    image?: string;
    site_name?: string;
    [prop: string]: string;
}

export interface Tags {
    title?: string;
    description?: string;
    url?: string;
    robots?: Robots;
    image?: string;
}

type Robots = 
    'index,follow' | 'index,nofollow' | 'noindex,nofollow' | 'noindex,follow' |
    'index, follow' | 'index, nofollow' | 'noindex, nofollow' | 'noindex, follow';

@Injectable()
export class MetafrenzyService {

    constructor(
        private readonly title: Title,
        private readonly meta: Meta,
        private readonly rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document
    ) {}

    setTitle(title: string) {
        this.title.setTitle(title);
    }

    getTitle(): string {
        return this.title.getTitle();
    }

    setMetaTag(name: string, content: string) {
        const metaDefinition = {};

        if (name.lastIndexOf('og:', 0) === 0) {
            metaDefinition['property'] = name;
        } else {
            metaDefinition['name'] = name;
        }

        metaDefinition['content'] = content;

        this.meta.updateTag(metaDefinition);
    }

    getMetaTag(selector: string): string {
        const tag = this.meta.getTag(selector);
        if (!tag) {
            return;
        }

        return tag.content;
    }

    setMetaCharsetTag(value: string) {
        this.meta.updateTag({
            charset: value
        }, 'charset');
    }

    setLinkTag(tag: LinkDefinition) {
        try {
            const renderer = this.rendererFactory.createRenderer(this.document, {
                id: '-1',
                encapsulation: ViewEncapsulation.None,
                styles: [],
                data: {}
            });

            const link = renderer.createElement('link');
            const head = this.document.head;

            Object.keys(tag).forEach((property: string) => {
                return renderer.setAttribute(link, property, tag[property]);
            });

            const currentHeadLinks = head.getElementsByTagName('link');
            for (let i = 0; i < currentHeadLinks.length; i++) {
                if ((currentHeadLinks[i].getAttribute('name') !== null
                        && currentHeadLinks[i].getAttribute('name') === link.getAttribute('name'))
                    || (currentHeadLinks[i].getAttribute('rel') !== null
                        && currentHeadLinks[i].getAttribute('rel') === link.getAttribute('rel')
                        && link.getAttribute('rel') !== 'stylesheet')) {

                    currentHeadLinks[i].remove();
                    continue;
                }
            }

            renderer.appendChild(head, link);
        } catch (e) {}
    }

    setAllTitleTags(title: string) {
        this.setTitle(title);
        this.setMetaTag('og:title', title);
    }

    setAllDescriptionTags(description: string) {
        this.setMetaTag('description', description);
        this.setMetaTag('og:description', description);
    }

    setCanonical(href: string) {
        this.setLinkTag({
            rel: 'canonical',
            href
        });
    }

    setRobots(content: Robots) {
        this.setLinkTag({
            rel: 'robots',
            content
        });
    }

    setOpenGraph(og: OpenGraph) {
        Object.keys(og).forEach((name: string) => {
            this.setMetaTag('og:' + name, og[name]);
        });
    }

    setTags(tags: Tags) {
        if (tags.hasOwnProperty('title') && tags.title) {
            this.setAllTitleTags(tags.title);
        }

        if (tags.hasOwnProperty('description') && tags.description) {
            this.setAllDescriptionTags(tags.description);
        }

        if (tags.hasOwnProperty('url') && tags.url) {
            this.setMetaTag('og:url', tags.url);
            this.setCanonical(tags.url);
        }

        if (tags.hasOwnProperty('image') && tags.image) {
            this.setMetaTag('og:image:url', tags.image);
        }

        if (tags.hasOwnProperty('robots') && tags.robots) {
            this.setRobots(tags.robots);
        }
    }

}
