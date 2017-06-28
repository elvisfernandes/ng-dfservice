import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DFService } from './df.service';

export * from './df.service';
export * from './dfserviceconfig.interface';
export * from './dfdatastore.class';
export * from './dfmodel.class';
export * from './dfresource.class';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
  ]
})
export class NgDFService {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgDFService,
      providers: [DFService]
    };
  }
}
