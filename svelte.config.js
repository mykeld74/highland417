import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = { kit: { 
  adapter: adapter(), 	
  alias: {
			$lib: './src/lib',
			$components: './src/components',
			$css: './src/css',
			$data: './src/data',
			$img: './src/images'
		} 
  } 
};

export default config;
