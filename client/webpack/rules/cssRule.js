export function cssRule() {
  return {
    module: {
      rules: [
        {
          test: [/\.css$/],
          use: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
  };
}
