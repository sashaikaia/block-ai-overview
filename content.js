// Automatically add -ai to Google searches to block AI Overview

function modifySearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  
  // Check if query exists and doesn't already have -ai
  if (query && !query.includes('-ai')) {
    // Add -ai to the query
    urlParams.set('q', query + ' -ai');
    
    // Redirect to modified URL
    const newUrl = window.location.pathname + '?' + urlParams.toString();
    window.location.replace(newUrl);
  }
}

// Run on page load
modifySearch();