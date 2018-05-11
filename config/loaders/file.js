const fileLoader = [
  {
    test: /\.(jpg|png)$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 25000,
      },
    },
  },
];

module.exports = {
  loader: fileLoader,
};