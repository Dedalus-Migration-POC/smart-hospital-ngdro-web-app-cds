const staging = "http://54.155.59.59:89";
const integration = "https://digitalservices-test.mondino.it:89";
const prod = "https://digitalservices.mondino.it:89";
const cds = "http://10.142.89.8/";

const routes = [
  "/api",
  "/uaa",
  "/sso",
  "/profile-manager",
  "/enumeration",
  "/news",
  "/medical-booking",
  "/payment",
  "/checkin",
  "/management-privacy-consent",
];

module.exports = routes.reduce(
  (acc, curr) => ({
    ...acc,
    [`${curr}/**`]: {
      target: cds,
      secure: false,
      changeOrigin: true,
      logLevel: "debug",
      configure: (proxy, _options) => {
        proxy.on("error", (err, _req, _res) => {
          console.log("proxy error", err);
        });
        proxy.on("proxyReq", (proxyReq, req, _res) => {
          const headers = proxyReq.getHeaders();
          // console.log(headers);
          console.log(
            req.method,
            req.url,
            " -> ",
            `${headers.host}${proxyReq.path}`
          );
        });
        proxy.on("proxyRes", (proxyRes, req, _res) => {
          console.log(
            req.method,
            "Target Response",
            proxyRes.statusCode,
            ":",
            req.url
          );
        });
      },
    },
  }),
  {}
);
