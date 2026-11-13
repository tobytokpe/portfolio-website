// Lets the index build load src/app/data/caseStudies.ts in plain Node: any image/video import becomes its file name.
import { register } from 'node:module';
register('./asset-hooks.mjs', import.meta.url);
