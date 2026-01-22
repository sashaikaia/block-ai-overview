const toggle = document.getElementById('toggle');

// Load state
chrome.storage.sync.get(['enabled'], (result) => {
  toggle.checked = result.enabled !== false;
});

// Save state on change
toggle.addEventListener('change', (e) => {
  chrome.storage.sync.set({ enabled: e.target.checked });
});