var account = window.location.pathname.split("/")[3];
var reason = prompt("Break the glass reason: ");
let user =
  prompt("User ID Override. Otherwise (click cancel) using 25 (Fred Admin)") ||
  25;
if (reason != null || reason != "") {
  fetch(
    `${window.location.origin}/llc/v1/accounts/${account}/break-the-glass`,
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
      body: `{\n  \"level\": \"ADMIN\",\n  \"reason\": \"${reason}\",\n  \"ttl\": 57000,\n  \"userId\": ${user}\n}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  ).then(() => location.reload());
}
