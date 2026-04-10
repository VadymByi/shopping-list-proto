const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  try {
    const { withNativeWind } = require("nativewind/utils");
    return withNativeWind(config, { input: "./src/styles/global.css" });
  } catch (e) {
    console.warn("NativeWind не найден, загружаем стандартный конфиг");
    return config;
  }
})();
