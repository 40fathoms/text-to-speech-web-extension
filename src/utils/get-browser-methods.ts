const getStorageAPI = () => {
  return navigator.userAgent.indexOf('Firefox') !== -1
    ? browser.storage
    : chrome.storage;
};

const getRuntimeAPI = () => {
  return navigator.userAgent.indexOf('Firefox') !== -1
    ? browser.runtime
    : chrome.runtime;
};

const getRuntimeTabs = () => {
  return navigator.userAgent.indexOf('Firefox') !== -1
    ? browser.tabs
    : chrome.tabs;
};

export { getStorageAPI, getRuntimeAPI, getRuntimeTabs };
