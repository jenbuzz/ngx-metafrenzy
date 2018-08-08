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
});
