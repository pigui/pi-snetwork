import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  documents: './libs/frontend/graphql/src/lib/**/*.graphql',
  generates: {
    './libs/frontend/graphql/src/lib/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
      config: {
        addExplicitOverride: true,
        apolloAngularVersion: 5,
        serviceProvidedInRoot: false,
        scalars: {
          Date: 'Date',
        },
        sdkClass: true,
        constEnums: true,
      },
    },
  },
};
export default config;
