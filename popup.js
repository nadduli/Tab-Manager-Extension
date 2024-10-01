// Group tabs by domain (domain-based tab organization)
function groupTabsByDomain(tabs) {
    const groups = {};
    tabs.forEach(tab => {
      const url = new URL(tab.url);
      const domain = url.hostname;
  
      if (!groups[domain]) {
        groups[domain] = [];
      }
      groups[domain].push(tab);
    });
    return groups;
  }
  
  // Close duplicate tabs (auto-close duplicates based on URLs)
  function closeDuplicateTabs(tabs) {
    const seenUrls = new Set();
    tabs.forEach(tab => {
      if (seenUrls.has(tab.url)) {
        chrome.tabs.remove(tab.id);  // Close duplicate tab
      } else {
        seenUrls.add(tab.url);
      }
    });
  }
  
  // Render tabs to the DOM
  function renderTabs(tabs, container) {
    container.innerHTML = '';  // Clear previous results
  
    tabs.forEach(tab => {
      let tabElement = document.createElement('div');
      tabElement.className = 'tab-item';
      tabElement.innerHTML = `${tab.title}`;
  
      let closeBtn = document.createElement('button');
      closeBtn.className = 'close-btn';
      closeBtn.textContent = 'Close';
  
      // Close tab and remove from the DOM
      closeBtn.onclick = () => {
        chrome.tabs.remove(tab.id, function() {
          // Remove tab element from DOM after tab is closed
          tabElement.remove();
        });
      };
  
      tabElement.appendChild(closeBtn);
      container.appendChild(tabElement);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const tabsContainer = document.getElementById('tabs-container');
    const searchInput = document.getElementById('search-input');
  
    // Group by domain button
    document.getElementById('group-btn').addEventListener('click', function () {
      chrome.tabs.query({}, function (tabs) {
        const groupedTabs = groupTabsByDomain(tabs);
  
        tabsContainer.innerHTML = '';  // Clear previous results
        Object.keys(groupedTabs).forEach(domain => {
          let domainDiv = document.createElement('div');
          domainDiv.className = 'domain-item';
          domainDiv.innerHTML = `<h4>${domain}</h4>`;
          
          groupedTabs[domain].forEach(tab => {
            let tabElement = document.createElement('div');
            tabElement.className = 'tab-item';
            tabElement.innerHTML = `${tab.title}`;
  
            let closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.textContent = 'Close';
  
            // Close tab and remove from the DOM
            closeBtn.onclick = () => {
              chrome.tabs.remove(tab.id, function() {
                tabElement.remove();  // Remove tab element after closing
                // Optionally, check if the domain group is empty after removal
                if (domainDiv.children.length === 1) { // If only header remains
                  domainDiv.remove();  // Remove entire domain group
                }
              });
            };
  
            tabElement.appendChild(closeBtn);
            domainDiv.appendChild(tabElement);
          });
  
          tabsContainer.appendChild(domainDiv);
        });
      });
    });
  
    // Search tabs
    document.getElementById('search-btn').addEventListener('click', function () {
      searchInput.style.display = 'block';  // Show the search input
    });
  
    // Search input logic
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();
  
      chrome.tabs.query({}, function (tabs) {
        const filteredTabs = tabs.filter(tab => 
          tab.title.toLowerCase().includes(query) || tab.url.toLowerCase().includes(query)
        );
        renderTabs(filteredTabs, tabsContainer);
      });
    });
  
    // Close duplicate tabs button
    document.getElementById('close-duplicates').addEventListener('click', function () {
      chrome.tabs.query({}, function (tabs) {
        closeDuplicateTabs(tabs);
      });
    });
  
    // Save session button
    document.getElementById('save-session').addEventListener('click', function () {
      chrome.tabs.query({}, function (tabs) {
        const tabUrls = tabs.map(tab => tab.url);
        chrome.storage.local.set({ savedTabs: tabUrls }, function () {
          console.log('Tab session saved');
        });
      });
    });
  
    // Restore session button
    document.getElementById('restore-session').addEventListener('click', function () {
      chrome.storage.local.get('savedTabs', function (data) {
        const savedTabs = data.savedTabs;
        if (savedTabs) {
          savedTabs.forEach(url => {
            chrome.tabs.create({ url });
          });
        }
      });
    });
  });
  