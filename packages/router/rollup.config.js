import typescript from 'rollup-plugin-typescript';
import dts from 'rollup-plugin-dts';
import svelte from 'rollup-plugin-svelte';
import filesize from 'rollup-plugin-filesize';

export default [
  {
    input: 'src/index.ts',
    external: ['svelte', 'svelte/internal', 'svelte/store'],
    output: [
      {
        file: 'dist/suave-router.es.js',
        format: 'es',
        sourcemap: true,
        plugins: []
      },
      {
        file: 'dist/suave-router.cjs.js',
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [typescript(), svelte(), filesize()]
  },
  {
    input: 'src/index.ts',
    external: ['svelte', 'svelte/internal', 'svelte/store'],
    output: [
      {
        file: 'dist/suave-router.d.ts',
        format: 'es'
      }
    ],
    plugins: [dts()]
  }
];
