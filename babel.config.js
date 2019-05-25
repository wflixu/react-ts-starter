module.exports = function (api) {
    api.cache(true);
  
    const presets = [ "react-app" ];
    const plugins = ["react-hot-loader/babel"];
  
    return {
      presets,
      plugins
    };
  }