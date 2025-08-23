export const middlewareConsole = (req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    next();
};


export const consoleReq = (req) => {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
};