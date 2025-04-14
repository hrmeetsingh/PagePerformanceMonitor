# Page Performance Monitor
A Chrome extension that monitors webpage performance metrics including load times, script execution, and DOM statistics. 
Note: This code is a part of a classroom program I am taking for showing the capabilities and functioning of chrome for Client-Side performance monitoring using browser extensions

## Features
- Measures key performance metrics like total load time, DOM interactive time, and time to first byte
- Tracks and displays the 5 slowest loading scripts on the page
- Shows DOM size and total number of scripts loaded
- Real-time monitoring through an easy-to-use popup interface

## Installation
1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage
1. After installation, the extension icon will appear in your Chrome toolbar
2. Navigate to any webpage you want to analyze
3. Click the extension icon to view performance metrics
4. Use the "show more..." toggle to view detailed script loading information

## Limitations
- Only works on pages after they have been fully loaded
- Some metrics may not be available on certain pages due to browser security restrictions
- Performance data is cleared when navigating to a new page or refreshing
- Only tracks the 5 slowest scripts per page
- Does not work on chrome:// URLs or the Chrome Web Store

## Warnings
- The extension requires broad host permissions to function properly
- Performance monitoring may have a small impact on page load times
- Script execution times are estimates and may vary between page loads
- The extension stores performance data temporarily in memory
- Make sure to test the extension thoroughly in your specific use case

## Technical Requirements
- Chrome browser version that supports Manifest V3
- Permissions for accessing webpage content and script injection
- Active internet connection for script monitoring

