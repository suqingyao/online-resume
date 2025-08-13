import type { Config } from 'tailwindcss';
import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons';

export default {
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mingcute', 'heroicons']),
    }),
  ],
} as Config;
