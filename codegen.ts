import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization:
            `bearer ${process.env.VITE_GH_TOKEN}`,
          'user-agent': 'node.js',
        },
      },
    },
  ],
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        useImplementingTypes: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
