import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://www.arthetic.live/graphql",
  documents: "src/gql/document.ts",
  generates: {
    "src/gql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
