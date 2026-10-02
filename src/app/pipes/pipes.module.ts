import { NgModule } from '@angular/core';
import { TimesPipe } from './times.pipe';
@NgModule({
	imports: [TimesPipe],
	exports: [TimesPipe]
})
export class PipesModule {}
