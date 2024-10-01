chrome.tabs.onCreated.addListener(function (newTab) {
    chrome.tabs.query({}, function (tabs) {
      const tabUrls = new Set();
      tabs.forEach(tab => {
        if (tabUrls.has(tab.url) && tab.id !== newTab.id) {
          chrome.tabs.remove(newTab.id); // Close the duplicate tab
        } else {
          tabUrls.add(tab.url);
        }
      });
    });
  });
  
  chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    console.log('Tab removed:', tabId);
  });
  