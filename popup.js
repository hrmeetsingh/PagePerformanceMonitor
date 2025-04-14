document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentTab = tabs[0];
      
      // Request performance data from background script
      chrome.runtime.sendMessage(
        { action: 'get-performance-data', tabId: currentTab.id },
        function(response) {
          displayPerformanceData(response, currentTab.url);
        }
      );
    });
  });
  
  function displayPerformanceData(data, currentUrl) {
    const dataContainer = document.getElementById('performance-data');
    
    if (!data) {
      dataContainer.innerHTML = `
        <p class="no-data">No performance data available for this page. Try reloading the page.</p>
      `;
      return;
    }
    
    // Format the performance data for display
    let html = `
      <div class="metric">
        <span class="metric-name">Page URL:</span> ${data.pageUrl}
      </div>
      <div class="metric">
        <span class="metric-name">Total Load Time:</span> ${data.loadTime.toFixed(2)} ms
      </div>
      <div class="metric">
        <span class="metric-name">DOM Interactive Time:</span> ${data.domInteractive.toFixed(2)} ms
      </div>
      <div class="metric">
        <span class="metric-name">DOM Content Loaded:</span> ${data.domContentLoaded.toFixed(2)} ms
      </div>
      <div class="metric">
        <span class="metric-name">Time to First Byte:</span> ${data.timeToFirstByte.toFixed(2)} ms
      </div>
      <div class="metric">
        <span class="metric-name">DOM Elements:</span> ${data.domSize}
      </div>
      <div class="metric">
        <span class="metric-name">Total Scripts Loaded:</span> ${data.totalScriptsLoaded}
      </div>
      
      <div class="section-header">
        <h2>Slowest Scripts</h2>
        <span class="toggle-link" id="toggleScripts">show more...</span>
      </div>
      <div id="scriptsContainer" class="scripts-container">
    `;
    
    if (data.slowestScripts && data.slowestScripts.length > 0) {
      html += '<div class="scripts-list">';
      data.slowestScripts.forEach(script => {
        html += `
          <div class="script-item">
            <div><strong>${script.name || 'Unnamed Script'}</strong> - ${script.duration} ms</div>
            <div class="script-url">${script.url}</div>
          </div>
        `;
      });
      html += '</div>';
    } else {
      html += '<p class="no-data">No script data available.</p>';
    }
    
    html += '</div>'; // Close scriptsContainer div
    
    dataContainer.innerHTML = html;
    
    // Add toggle functionality
    const toggleLink = document.getElementById('toggleScripts');
    const scriptsContainer = document.getElementById('scriptsContainer');
    
    toggleLink.addEventListener('click', function() {
      const isHidden = scriptsContainer.style.display === 'none' || scriptsContainer.style.display === '';
      
      if (isHidden) {
        scriptsContainer.style.display = 'block';
        toggleLink.textContent = 'show less...';
      } else {
        scriptsContainer.style.display = 'none';
        toggleLink.textContent = 'show more...';
      }
    });
  }
  