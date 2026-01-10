import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// Vite config at project root so `npm run dev` picks it up
export default defineConfig({
  plugins: [react(), tailwindcss() ],

})
