import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".astro/**",
      "public/**",
      "backend/**",
      "scripts/**",
      "vendor/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Allow intentionally-unused args/vars when prefixed with `_`.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // Pre-existing codebase style: pragmatic `any` in shop/api glue code.
      "@typescript-eslint/no-explicit-any": "warn",
      // Empty `catch {}` is used deliberately for best-effort browser APIs
      // (wake lock, localStorage, JSON.parse of untrusted state).
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  {
    // Inline `is:inline` scripts in .astro files carry third-party vendor
    // snippets (Brevo/analytics stubs) that rely on classic-script idioms.
    // (`*.astro/*.js` matches the virtual modules the astro plugin creates
    // for `<script>` blocks.)
    files: ["**/*.astro", "**/*.astro/*.js", "**/*.astro/*.ts"],
    rules: {
      "no-var": "off",
      "prefer-rest-params": "off",
    },
  },
];
