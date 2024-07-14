import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

type ViteConfig = {
  mode: string;
  command: string;
};

// https://vitejs.dev/config/
export default (args: ViteConfig) => {
  const generateScopedName: string =
    args.mode === "production" ? "[hash:base64:8]" : "[local]_[hash:base64:8]";

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000
    },
    css: {
      modules: {
        scopeBehaviour: "local",
        generateScopedName,
        localsConvention: "camelCase"
      }
    }
  });
};
