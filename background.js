let performanceDataStore = {};

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performance-data') {
    const tabId = sender.tab.id;
    performanceDataStore[tabId] = message.data;
  } else if (message.action === 'get-performance-data') {
    const tabId = message.tabId;
    sendResponse(performanceDataStore[tabId] || null);
  }
  return true;
});
