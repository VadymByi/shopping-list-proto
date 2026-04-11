module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "nativewind/babel",
        {
          mode: "transformOnly", // Важно для Web версии в Expo 54
        },
      ],
    ],
  };
};
