import svelte from 'rollup-plugin-svelte';
import filesize from 'rollup-plugin-filesize';

export default {
  input: 'src/index.js',
  external: ['svelte/internal', 'svelte/store'],
  output: [
    {
      file: 'dist/suave-router.es.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/suave-router.cjs.js',
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [svelte(), filesize()]
};
