const getSetting = (key, fallback = false) => {
  if (window.config) {
  }
  var value =
    (window.config && window.config[key]) ||
    (global.__CONFIG && global.__CONFIG[key]) ||
    process.env[key] ||
    fallback;
  return value;
};

export default getSetting;
