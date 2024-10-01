# Advanced Tab Manager Chrome Extension

## Overview

The **Advanced Tab Manager** is a Chrome extension designed to enhance your browsing experience by helping you manage your tabs more effectively. With features such as grouping tabs by domain, searching for tabs, closing duplicate tabs, and saving/restoring tab sessions, it aims to declutter your browsing environment.

## Features

- **Group Tabs by Domain**: Organize your open tabs based on their domains for better visibility and management.
- **Search Tabs**: Quickly find open tabs by entering keywords related to their titles or URLs.
- **Close Duplicate Tabs**: Automatically close any duplicate tabs based on their URLs to reduce clutter.
- **Save Session**: Save all currently open tabs and their URLs for future restoration.
- **Restore Session**: Reopen all previously saved tabs in a single click.

## Installation

### Prerequisites

- Google Chrome installed on your computer.

### Steps

1. **Download or Clone the Repository**:
   Clone this repository or download it as a ZIP file and extract it to a folder on your computer.

   ```bash
   git clone https://github.com/nadduli/Tab-Manager-Extension.git

2. Load the Extension in Chrome:
* Open Chrome and navigate to chrome://extensions/.
* Enable Developer Mode by toggling the switch in the top-right corner.
* Click on Load unpacked and select the folder where you downloaded or extracted the project.

3. **Ready to Use***: After loading, the extension icon will appear in your Chrome toolbar.

### Usage

1. **Open the Extension**: Click the Advanced Tab Manager icon in the Chrome toolbar.

2. **Group Tabs by Domain**: Click the Group by Domain button to categorize your open tabs by domain.

3. **Search for Tabs**: Click the Search Tabs button, enter your search term, and the extension will filter the tabs accordingly.

4. **Close Duplicate Tabs**: Click the Close Duplicates button to remove duplicate tabs automatically.

5. **Save Session**: Click the Save Session button to save all open tab URLs to Chrome's local storage.

6. **Restore Session**: Click the Restore Session button to reopen all saved tabs.

### Code Structure
**manifest.json**: Contains metadata about the extension, including permissions and background scripts.
**popup.html**: The HTML layout for the extension's popup interface.
**popup.js**: JavaScript file that implements the functionality for managing tabs.
**style.css**: Stylesheet for the popup interface.

### Permissions
The extension requires the following permissions in manifest.json:
```json
{
"permissions": [
  "tabs",
  "storage"
]

}

### Author
Nadduli Daniel <naddulidaniel94@gmail.com>


