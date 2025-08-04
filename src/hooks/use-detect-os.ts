import { useEffect, useState } from 'react';

// Enum para los posibles sistemas operativos
export enum OSType {
  MacOS = 'macos',
  Windows = 'windows',
  Linux = 'linux',
  Android = 'android',
  iOS = 'ios',
  Other = 'other',
}

export type OSInfo = {
  os: OSType;
  rawUA: string;
};

type HighEntropyValues = {
  platform?: string;
  [key: string]: unknown;
};

declare global {
  interface Navigator {
    userAgentData?: {
      getHighEntropyValues: (hints: string[]) => Promise<HighEntropyValues>;
    };
  }
}

function detectOSFromUA(userAgent: string): OSType {
  const ua = userAgent.toLowerCase();

  if (/macintosh|mac os x/.test(ua)) return OSType.MacOS;
  if (/windows nt/.test(ua)) return OSType.Windows;
  if (/linux/.test(ua)) return OSType.Linux;
  if (/android/.test(ua)) return OSType.Android;
  if (/iphone|ipad|ipod/.test(ua)) return OSType.iOS;
  return OSType.Other;
}

export function useDetectOS(): OSInfo {
  const [osInfo, setOSInfo] = useState<OSInfo>({
    os: OSType.Other,
    rawUA: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Chrome/Edge: use User-Agent Client Hints API if it's available
    const uaData = navigator.userAgentData;
    if (uaData && typeof uaData.getHighEntropyValues === 'function') {
      uaData.getHighEntropyValues(['platform']).then((data) => {
        let detectedOS = OSType.Other;
        const platform = typeof data.platform === 'string' ? data.platform.toLowerCase() : '';

        if (platform.includes('mac')) detectedOS = OSType.MacOS;
        else if (platform.includes('win')) detectedOS = OSType.Windows;
        else if (platform.includes('android')) detectedOS = OSType.Android;
        else if (platform.includes('iphone') || platform.includes('ipad') || platform.includes('ios'))
          detectedOS = OSType.iOS;
        else if (platform.includes('linux')) detectedOS = OSType.Linux;

        setOSInfo({
          os: detectedOS,
          rawUA: navigator.userAgent,
        });
      });
    } else {
      // Fallback with navigator.userAgent
      setOSInfo({
        os: detectOSFromUA(navigator.userAgent),
        rawUA: navigator.userAgent,
      });
    }
  }, []);

  return osInfo;
}
