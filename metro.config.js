const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Включаем поддержку CSS (необходимо для Tailwind в Web)
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
