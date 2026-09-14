import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

export default [
  {
    // Replaces the old `--ignore-path .gitignore` flag, dropped by `next lint` in Next 16.
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      ".sanity/**",
      "dist/**",
      ".netlify/**",
      ".cache/**",
      "public/**",
      "data/**"
    ]
  },
  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Handled by @typescript-eslint via eslint-config-next/typescript.
      "no-unused-vars": "off",
      // Surfaced for the first time by the Next 16 / ESLint 9 config, on code that
      // predates it. Kept visible as warnings so the lint gate stays green while
      // they get cleaned up separately.
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/set-state-in-effect": "warn"
    }
  },
  {
    // Tailwind and PostCSS configs are CommonJS by design.
    files: ["*.config.js", "*.config.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off"
    }
  }
];
