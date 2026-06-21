import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: "src/module.ts",
      name: "soundbard",
      fileName: () => "soundbard.js",
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        // Bundle everything (including dynamically-imported apps) into the single
        // soundbard.js entry. Splitting into separate chunks (module.js,
        // SlotConfigApp.js, …) with non-hashed names caused stale-cache mismatches:
        // Rollup reassigns one-letter export identifiers each build, so a cached
        // chunk would import a letter the freshly-built sibling no longer exported.
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((n) => n.endsWith(".css"))) return "soundbard.css";
          return "[name][extname]";
        },
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: "module.json", dest: "." },
        { src: "lang", dest: "." },
      ],
    }),
  ],
});
