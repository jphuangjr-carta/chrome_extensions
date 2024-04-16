var defaultConfig = {
  autobreak: false,
  defaultReason: "Dev",
  defaultUser: 25,
};

var account = window.location.pathname.split("/")[3];
var reason = defaultConfig.autobreak
  ? defaultConfig.defaultReason
  : window.prompt("Reason for breaking the glass");
var user = defaultConfig.autobreak
  ? defaultConfig.defaultUser
  : window.prompt("User ID");
if (reason) {
  if (reason != null || reason != "") {
    fetch(
      `${window.location.origin.replace(
        "app",
        "llc-core"
      )}/llc/v1/accounts/${account}/break-the-glass`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
        referrer:
          "https://llc-core.demo.carta.team/swagger-ui.html?urls.primaryName=default",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `{\n  \"level\": \"ADMIN\",\n  \"reason\": \"${reason}\",\n  \"ttl\": 57600,\n  \"userId\": ${user}\n}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    ).then(() => location.reload());
  }
}
