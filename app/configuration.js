const getEnvironmentVariable = (key) => {
    return process.env[key] || "";
};

const getBooleanEnvironmentVariable = (key) => {
    const original = getEnvironmentVariable(key);
    return /^true$/ig.test(original);
};

const getNumberEnvironmentVariable = (key) => {
    const original = getEnvironmentVariable(key);
    return original === "" ? undefined : Number(original);
};

module.exports = {
    version: require("../package").version,
    company: getEnvironmentVariable("JX_COMPANY_NAME"),
    wx: {
        appid: getEnvironmentVariable("JX_WX_APP_ID"),
        secret: getEnvironmentVariable("JX_WX_APP_SECRET")
    }
};