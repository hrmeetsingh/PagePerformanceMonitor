performance.mark('extension-start');

// Listen for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  performance.mark('dom-content-loaded');
  performance.measure('time-to-dom-content-loaded', 'extension-start', 'dom-content-loaded');
});

// Listen for when the page is fully loaded
window.addEventListener('load', () => {
  performance.mark('page-load-complete');
  performance.measure('total-page-load-time', 'extension-start', 'page-load-complete');
  
  // Collect performance data
  setTimeout(collectPerformanceData, 1000);
});

function collectPerformanceData() {
  // Get navigation timing data
  const navigationTiming = performance.getEntriesByType('navigation')[0];
  
  // Get resource timing data
  const resourceEntries = performance.getEntriesByType('resource');
  
  // Find script resources and sort by duration
  const scriptResources = resourceEntries
    .filter(entry => entry.initiatorType === 'script' || entry.name.endsWith('.js'))
    .sort((a, b) => b.duration - a.duration);
  
  // Get the top 5 slowest scripts
  const slowestScripts = scriptResources.slice(0, 5).map(script => ({
    name: script.name.split('/').pop(),
    url: script.name,
    duration: script.duration.toFixed(2)
  }));
  
  // Collect performance measures
  const measures = performance.getEntriesByType('measure');
  
  // Prepare data to send to the extension
  const performanceData = {
    pageUrl: window.location.href,
    domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
    loadTime: navigationTiming.loadEventEnd - navigationTiming.fetchStart,
    domInteractive: navigationTiming.domInteractive - navigationTiming.fetchStart,
    slowestScripts: slowestScripts,
    totalScriptsLoaded: scriptResources.length,
    timeToFirstByte: navigationTiming.responseStart - navigationTiming.requestStart,
    domSize: document.getElementsByTagName('*').length
  };
  
  // Send data to background script
  chrome.runtime.sendMessage({
    action: 'performance-data',
    data: performanceData
  });
}
