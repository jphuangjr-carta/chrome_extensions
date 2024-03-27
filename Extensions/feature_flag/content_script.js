// content_script.js

// Function to fetch data with edited parameters
async function fetchData(domain, name, isEnabled) {
  const csrftoken = await getCookie("csrftoken"); // Retrieve csrftoken cookie

  const requestBody = {
    clientData: {
      ttl: 2592000,
      owner: "joshua.huang@carta.com",
    },
    conditions: [],
    created_date: new Date().toISOString(), // Current date
    isEnabled: isEnabled,
    name: name,
  };

  try {
    const response = await fetch(
      `https://app.${domain}.test.carta.rocks/api/staff/flipper/`,
      {
        method: "POST",
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "x-csrftoken": csrftoken,
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      }
    );
    console.log("Response:", response);
    // Handle response as needed
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to retrieve a specific cookie value
function getCookie(name) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.cookies.get({ url: tabs[0].url, name: name }, function (cookie) {
        if (cookie) {
          resolve(cookie.value);
        } else {
          reject("Cookie not found");
        }
      });
    });
  });
}

// Receive message from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message received:", message);
  if (message.action === "fetchData") {
    fetchData(message.domain, message.name, message.isEnabled);
  }
});
