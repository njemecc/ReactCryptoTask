//resavamo proxy problem
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 5000;

app.use(
  "/nesto",
  createProxyMiddleware({
    target: "https://api.bitfinex.com",
    changeOrigin: true,
    pathRewrite: {
      "^/nesto": "",
    },
  })
);

app.listen(port, () => {
  console.log(`Proxy server je pokrenut na portu ${port}`);
});
