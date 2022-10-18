import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'https://min-simple-blog.herokuapp.com/api',
				changeOrigin: true
			}
		}
	}
};

export default config;
				// rewrite: (path) => path.replace(/^\/api/, '')
