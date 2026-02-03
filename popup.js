const toggle = document.getElementById('toggle');

chrome.storage.sync.get(['enabled'], (result) => {
  toggle.checked = result.enabled !== false;
});

toggle.addEventListener('change', (e) => {
  chrome.storage.sync.set({ enabled: e.target.checked });
  // Icon updates automatically via background.js listener
});