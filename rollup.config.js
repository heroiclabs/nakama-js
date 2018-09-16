import packagejson from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [{
      "file": packagejson.main,
      "format": 'cjs',
      "name": 'nakamajs',
    }, {
      "file": packagejson.browser,
      "format": 'umd',
      "name": 'nakamajs',
    }, {
      "file": packagejson.module,
      "format": 'es',
      "name": 'nakamajs',
    }
  ],
  plugins: [
    typescript()
  ],
  moduleContext: {
    [require.resolve('whatwg-fetch')]: 'window'
  },
};
