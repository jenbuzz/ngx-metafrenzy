import { Injectable, RendererFactory2, Inject, ViewEncapsulation } from '@angular/core';
import { Meta, Title, DOCUMENT } from '@angular/platform-browser';

export declare type LinkDefinition = {
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
};

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

    setMetaTag(name: string, content: string) {
        let metaDefinition = {};

        if (name.lastIndexOf('og:', 0) === 0) {
            metaDefinition['property'] = name;
        } else {
            metaDefinition['name'] = name;
        }

        metaDefinition['content'] = content;

        this.meta.updateTag(metaDefinition);
    }

    setMetaCharsetTag(value: string) {
        this.meta.updateTag({
            charset: value
        });
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

            renderer.appendChild(head, link);
        } catch(e) {}
    }

}
