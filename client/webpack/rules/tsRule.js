import tsNameof from 'ts-nameof';

export function tsRule() {
  return {
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({ before: [tsNameof] }),
              },
            },
          ],
        },
      ],
    },
  };
}
