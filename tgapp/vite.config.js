import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    host: '172.18.0.1'
  },
  define: {
    'process.env': {
      SERVER_URL: "https://api.marokhonko.space",
      MONOBANK_TOKEN :"uUUVXVUVpqgXDGHNVdtqdMlscXsXFgCzaMUja-c7wr_Q",
      MONOBANK_API: "https://api.monobank.ua",
    }
  }

})
