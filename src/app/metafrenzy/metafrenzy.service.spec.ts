import { TestBed } from '@angular/core/testing';
import { MetafrenzyService } from './metafrenzy.service';

describe('MetafrenzyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MetafrenzyService]
        });
        this.service = TestBed.get(MetafrenzyService);
    });

    it('should set and get title', () => {
        const title = 'Lorem ipsum';
        this.service.setTitle(title);
        expect(this.service.getTitle()).toBe(title);
    });

    it('should set and get meta tag', () => {
        const name = 'test';
        const content = 'Lorem ipsum';
        this.service.setMetaTag(name, content);
        expect(this.service.getMetaTag('name=' + name)).toBe(content);
    });

    it('should not get meta tag', () => {
        expect(this.service.getMetaTag('name=nope')).toBeUndefined();
    });

    it('should set title tag and open graph title tag', () => {
        const title = 'Lorem ipsum';
        this.service.setAllTitleTags(title);
        expect(this.service.getTitle()).toBe(title);
        expect(this.service.getMetaTag('property="og:title"')).toBe(title);
    });

    it('should set description meta and open graph tags', () => {
        const description = 'Lorem ipsum';
        this.service.setAllDescriptionTags(description);
        expect(this.service.getMetaTag('name=description')).toBe(description);
        expect(this.service.getMetaTag('property="og:description"')).toBe(description);
    });

    it('should set multiple tags with one call', () => {
        const title = 'Lorem ipsum';
        const description = 'Bla bla';
        const url = 'http://test.test';
        const image = 'image.jpg';
        const robots = 'noindex,nofollow';

        this.service.setTags({
            title,
            description,
            url,
            image,
            robots
        });

        expect(this.service.getTitle()).toBe(title);
        expect(this.service.getMetaTag('property="og:title"')).toBe(title);

        expect(this.service.getMetaTag('name=description')).toBe(description);
        expect(this.service.getMetaTag('property="og:description"')).toBe(description);

        expect(this.service.getMetaTag('property="og:url"')).toBe(url);

        expect(this.service.getMetaTag('property="og:image:url"')).toBe(image);
    });
});
