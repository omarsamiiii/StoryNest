import next from "eslint-config-next";
import prettier from "eslint-config-prettier";

const config = [
  ...next,
  prettier,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off"
    }
  }
];

export default config;
