import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
    overrides: [
      {
        files: ["**/prisma/generated/**", "**/src/generated/prisma/**"], // Inclui a pasta do Prisma
        rules: {
          "@typescript-eslint/no-unused-vars": "off", // Ignora as regras de variáveis não usadas
        },
      },
    ],
  },
];

export default eslintConfig;
