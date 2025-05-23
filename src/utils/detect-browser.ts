/**
 * Detects the browser being used based on the `navigator.userAgent` string.
 *
 * @returns {string} The name of the browser. Possible values are:
 * - `'Firefox'` for Mozilla Firefox
 * - `'Edge'` for Microsoft Edge
 * - `'Chrome'` for Google Chrome
 * - `'Safari'` for Apple Safari
 * - `'Unknown'` if the browser cannot be identified
 */
const detectBrowser = ():
  | 'Firefox'
  | 'Edge'
  | 'Chrome'
  | 'Safari'
  | 'Unknown' => {
  const userAgent = navigator.userAgent;

  if (userAgent.includes('Firefox/')) {
    return 'Firefox';
  } else if (userAgent.includes('Edg/')) {
    return 'Edge';
  } else if (userAgent.includes('Chrome/')) {
    return 'Chrome';
  } else if (userAgent.includes('Safari/')) {
    return 'Safari';
  } else {
    return 'Unknown';
  }
};

export { detectBrowser };
