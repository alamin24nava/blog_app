// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   envPrefix: "REACT_APP_",
// })


import react from "@vitejs/plugin-react";
// import path from "path";
import { defineConfig } from "vite";
// import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
    return {
        // server: {
        //     port: 9000,
        // },
        build: {
            outDir: "build",
        },
        plugins: [react()],
        envPrefix: "REACT_APP_",
        // resolve: {
        //     alias: {
        //         "@": path.resolve(__dirname, "./src"),
        //     },
        // },
    };
});