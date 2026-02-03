// Update icon on install and startup
chrome.runtime.onInstalled.addListener(() => {
  updateIcon();
});

chrome.runtime.onStartup.addListener(() => {
  updateIcon();
});

// Listen for storage changes from popup
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    updateIcon();
  }
});

async function updateIcon() {
  const result = await chrome.storage.sync.get(['enabled']);
  const enabled = result.enabled !== false;
  
  // Generate icons at multiple sizes
  const sizes = [16, 32, 48, 128];
  const imageData = {};
  
  for (const size of sizes) {
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Transparent background
    ctx.clearRect(0, 0, size, size);
    
    // Emoji - make it BIG
    ctx.font = `${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (enabled) {
      // Blocking AI - show "no" symbol
      ctx.fillText('🚫', size/2, size * 0.6);
    } else {
      // AI active - show robot
      ctx.fillText('🤖', size/2, size * 0.6);
    }
    
    imageData[size] = ctx.getImageData(0, 0, size, size);
  }
  
  // Set icon with all sizes
  chrome.action.setIcon({ imageData });
}