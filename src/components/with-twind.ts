import install from '@twind/with-web-components';
import { defineConfig } from '@twind/core';
import presetTailwind from '@twind/preset-tailwind';
import presetAutoprefix from '@twind/preset-autoprefix';

const config = defineConfig({
  presets: [
    presetTailwind(),
    presetAutoprefix(),
  ],
});

export const withTwind = install(config);
