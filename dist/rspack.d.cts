import rspack from '@rspack/core';
import { W as WebpackBar, a as WebpackBarOptions } from './shared/webpackbar.28dc8790.cjs';
export { R as Reporter, S as State } from './shared/webpackbar.28dc8790.cjs';
import 'webpack';

declare class WebpackBarProgressPlugin extends rspack.ProgressPlugin {
    webpackbar: WebpackBar;
    constructor(options?: WebpackBarOptions);
    apply(compiler: any): void;
}

export { WebpackBarOptions, WebpackBarProgressPlugin as default };
