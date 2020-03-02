import { TestBed } from '@angular/core/testing';
import { MetafrenzyService } from './metafrenzy.service';

describe('MetafrenzyService', () => {
    let service: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MetafrenzyService]
        });
        service = TestBed.inject(MetafrenzyService);
    });

    it('should set and get title', () => {
        const title = 'Lorem ipsum';
        service.setTitle(title);
        expect(service.getTitle()).toBe(title);
    });

    it('should set and get meta tag', () => {
        const name = 'test';
        const content = 'Lorem ipsum';
        service.setMetaTag(name, content);
        expect(service.getMetaTag('name=' + name)).toBe(content);
    });

    it('should not get meta tag', () => {
        expect(service.getMetaTag('name=nope')).toBe('');
    });

    it('should set title tag and open graph title tag', () => {
        const title = 'Lorem ipsum';
        service.setAllTitleTags(title);
        expect(service.getTitle()).toBe(title);
        expect(service.getMetaTag('property="og:title"')).toBe(title);
    });

    it('should set description meta and open graph tags', () => {
        const description = 'Lorem ipsum';
        service.setAllDescriptionTags(description);
        expect(service.getMetaTag('name=description')).toBe(description);
        expect(service.getMetaTag('property="og:description"')).toBe(description);
    });

    it('should set multiple tags with one call', () => {
        const title = 'Lorem ipsum';
        const description = 'Bla bla';
        const url = 'http://test.test';
        const image = 'image.jpg';
        const robots = 'noindex,nofollow';

        service.setTags({
            title,
            description,
            url,
            image,
            robots,
        });

        expect(true).toBeTruthy();

        expect(service.getTitle()).toBe(title);
        expect(service.getMetaTag('property="og:title"')).toBe(title);

        expect(service.getMetaTag('name=description')).toBe(description);
        expect(service.getMetaTag('property="og:description"')).toBe(description);

        expect(service.getMetaTag('property="og:url"')).toBe(url);

        expect(service.getMetaTag('property="og:image:url"')).toBe(image);
    });

    it('should set multiple tags except for title with one call', () => {
        const description = 'Bla bla';
        const url = 'http://test.test';
        const image = 'image.jpg';
        const robots = 'noindex,nofollow';

        service.setTags({
            description,
            url,
            image,
            robots,
        });

        expect(service.getMetaTag('name=description')).toBe(description);
        expect(service.getMetaTag('property="og:description"')).toBe(description);

        expect(service.getMetaTag('property="og:url"')).toBe(url);

        expect(service.getMetaTag('property="og:image:url"')).toBe(image);
    });

    it('should set multiple tags except for description with one call', () => {
        const title = 'Lorem ipsum';
        const url = 'http://test.test';
        const image = 'image.jpg';
        const robots = 'noindex,nofollow';

        service.setTags({
            title,
            url,
            image,
            robots,
        });

        expect(service.getTitle()).toBe(title);
        expect(service.getMetaTag('property="og:title"')).toBe(title);

        expect(service.getMetaTag('property="og:url"')).toBe(url);

        expect(service.getMetaTag('property="og:image:url"')).toBe(image);
    });

    it('should set multiple tags except for url with one call', () => {
        const title = 'Lorem ipsum';
        const description = 'Bla bla';
        const image = 'image.jpg';
        const robots = 'noindex,nofollow';

        service.setTags({
            title,
            description,
            image,
            robots,
        });

        expect(service.getTitle()).toBe(title);
        expect(service.getMetaTag('property="og:title"')).toBe(title);

        expect(service.getMetaTag('name=description')).toBe(description);
        expect(service.getMetaTag('property="og:description"')).toBe(description);

        expect(service.getMetaTag('property="og:image:url"')).toBe(image);
    });

    it('should set multiple tags except for image with one call', () => {
        const title = 'Lorem ipsum';
        const description = 'Bla bla';
        const url = 'http://test.test';
        const robots = 'noindex,nofollow';

        service.setTags({
            title,
            description,
            url,
            robots,
        });

        expect(service.getTitle()).toBe(title);
        expect(service.getMetaTag('property="og:title"')).toBe(title);

        expect(service.getMetaTag('name=description')).toBe(description);
        expect(service.getMetaTag('property="og:description"')).toBe(description);

        expect(service.getMetaTag('property="og:url"')).toBe(url);
    });

    it('should set multiple tags except for robots with one call', () => {
        const title = 'Lorem ipsum';
        const description = 'Bla bla';
        const url = 'http://test.test';
        const image = 'image.jpg';

        service.setTags({
            title,
            description,
            url,
            image,
        });

        expect(service.getTitle()).toBe(title);
        expect(service.getMetaTag('property="og:title"')).toBe(title);

        expect(service.getMetaTag('name=description')).toBe(description);
        expect(service.getMetaTag('property="og:description"')).toBe(description);

        expect(service.getMetaTag('property="og:url"')).toBe(url);

        expect(service.getMetaTag('property="og:image:url"')).toBe(image);
    });
});
