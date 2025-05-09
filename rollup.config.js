import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/extension.js',
    format: 'es',
    sourcemap: !production,
    name: 'modernArgocdAppsetExtension'
  },
  external: ['react', 'react-dom'],
  plugins: [
    // Résout les modules node_modules
    resolve({
      browser: true,
      extensions: ['.js', '.ts', '.tsx']
    }),
    
    // Convertit les modules CommonJS en ES modules
    commonjs(),
    
    // Gestion des fichiers CSS
    css({ output: 'extension.css' }),
    
    // Transpilation TypeScript
    typescript({
      sourceMap: !production,
      inlineSources: !production,
      compilerOptions: {
        jsx: 'react',
        allowSyntheticDefaultImports: true
      }
    }),
    
    // Minification en production
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
