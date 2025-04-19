import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$routes: path.resolve('./src/routes')
		}
	},
    server: {
        fs: {
          // Allow serving files from one level up to the project root
          allow: ['..'],
        },
      },
};

export default config;
