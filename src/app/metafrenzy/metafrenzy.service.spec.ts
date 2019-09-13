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
        expect(this.service.getMetaTag('name=nope')).toBe('');
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
            robots,
        });

        expect(this.service.getTitle()).toBe(title);
        expect(this.service.getMetaTag('property="og:title"')).toBe(title);

        expect(this.service.getMetaTag('name=description')).toBe(description);
        expect(this.service.getMetaTag('property="og:description"')).toBe(description);

        expect(this.service.getMetaTag('property="og:url"')).toBe(url);

        expect(this.service.getMetaTag('property="og:image:url"')).toBe(image);
    });

    it('should set multiple tags except for title with one call', () => {
        const description = 'Bla bla';
        const url = 'http://test.test';
        const image = 'image.jpg';
        const robots = 'noindex,nofollow';

        this.service.setTags({
            description,
            url,
            image,
            robots,
        });

        expect(this.service.getMetaTag('name=description')).toBe(description);
        expect(this.service.getMetaTag('property="og:description"')).toBe(description);

        expect(this.service.getMetaTag('property="og:url"')).toBe(url);

        expect(this.service.getMetaTag('property="og:image:url"')).toBe(image);
    });

    it('should set multiple tags except for description with one call', () => {
        const title = 'Lorem ipsum';
        const url = 'http://test.test';
        const image = 'image.jpg';
        const robots = 'noindex,nofollow';

        this.service.setTags({
            title,
            url,
            image,
            robots,
        });

        expect(this.service.getTitle()).toBe(title);
        expect(this.service.getMetaTag('property="og:title"')).toBe(title);

        expect(this.service.getMetaTag('property="og:url"')).toBe(url);

        expect(this.service.getMetaTag('property="og:image:url"')).toBe(image);
    });

    it('should set multiple tags except for url with one call', () => {
        const title = 'Lorem ipsum';
        const description = 'Bla bla';
        const image = 'image.jpg';
        const robots = 'noindex,nofollow';

        this.service.setTags({
            title,
            description,
            image,
            robots,
        });

        expect(this.service.getTitle()).toBe(title);
        expect(this.service.getMetaTag('property="og:title"')).toBe(title);

        expect(this.service.getMetaTag('name=description')).toBe(description);
        expect(this.service.getMetaTag('property="og:description"')).toBe(description);

        expect(this.service.getMetaTag('property="og:image:url"')).toBe(image);
    });

    it('should set multiple tags except for image with one call', () => {
        const title = 'Lorem ipsum';
        const description = 'Bla bla';
        const url = 'http://test.test';
        const robots = 'noindex,nofollow';

        this.service.setTags({
            title,
            description,
            url,
            robots,
        });

        expect(this.service.getTitle()).toBe(title);
        expect(this.service.getMetaTag('property="og:title"')).toBe(title);

        expect(this.service.getMetaTag('name=description')).toBe(description);
        expect(this.service.getMetaTag('property="og:description"')).toBe(description);

        expect(this.service.getMetaTag('property="og:url"')).toBe(url);
    });

    it('should set multiple tags except for robots with one call', () => {
        const title = 'Lorem ipsum';
        const description = 'Bla bla';
        const url = 'http://test.test';
        const image = 'image.jpg';

        this.service.setTags({
            title,
            description,
            url,
            image,
        });

        expect(this.service.getTitle()).toBe(title);
        expect(this.service.getMetaTag('property="og:title"')).toBe(title);

        expect(this.service.getMetaTag('name=description')).toBe(description);
        expect(this.service.getMetaTag('property="og:description"')).toBe(description);

        expect(this.service.getMetaTag('property="og:url"')).toBe(url);

        expect(this.service.getMetaTag('property="og:image:url"')).toBe(image);
    });
});
