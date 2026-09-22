// Check if extension is enabled before modifying search

function modifySearch() {
  // Check if extension is enabled
  chrome.storage.sync.get(['enabled'], function(result) {
    const enabled = result.enabled !== false; // default to true
    
    if (!enabled) {
      return; // Don't modify if paused
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    // Check if query exists and doesn't already have -ai
    if (query && !/\b-?ai\b/i.test(query))  {
      // Add -ai to the query
      urlParams.set('q', query + ' -ai');
      
      // Redirect to modified URL
      const newUrl = window.location.pathname + '?' + urlParams.toString();
      window.location.replace(newUrl);
    }
  });
}

// Run on page load
modifySearch();