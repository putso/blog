import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import path from 'path';
// import url from 'url'
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   }
  // },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "@/assets/styles/main.scss";`
  //     }
  //   }
  // }
})  
