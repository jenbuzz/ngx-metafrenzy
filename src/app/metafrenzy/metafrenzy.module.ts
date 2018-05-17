import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetafrenzyService } from './metafrenzy.service';
import { MetafrenzyGuard } from './metafrenzy.guard';

@NgModule({
    imports: [
        CommonModule
    ]
})
export class MetafrenzyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MetafrenzyModule,
            providers: [
                MetafrenzyService,
                MetafrenzyGuard
            ]
        };
    }
}
