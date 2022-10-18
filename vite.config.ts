import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: 'https://min-simple-blog.herokuapp.com/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, 'https://min-simple-blog.herokuapp.com/api')
			}
		}
	}
};

export default config;
