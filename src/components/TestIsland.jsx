import React from 'react';
import { useLivePreview } from '@payloadcms/live-preview-react';

export default function TestIsland({ initialData, cmsUrl }) {
  const { data } = useLivePreview({
    initialData,
    serverURL: cmsUrl,
    depth: 2,
  });

  const heading = data?.test_heading || initialData?.test_heading;

  const formatImageUrl = (urlStr) => {
    if (!urlStr || typeof urlStr !== 'string') return null;
    let clean = urlStr.replace(/^http:\/\/localhost:(3000|4000)/, cmsUrl);
    if (clean.startsWith('http')) return clean;
    return `${cmsUrl}${clean.startsWith('/') ? '' : '/'}${clean}`;
  };

  let imageUrl = null;
  const imgObj = data?.test_image || initialData?.test_image;
  if (imgObj) {
    if (typeof imgObj === 'object' && imgObj.url) {
      imageUrl = formatImageUrl(imgObj.url);
    } else if (typeof imgObj === 'string') {
      imageUrl = formatImageUrl(imgObj);
    }
  }

  return (
    <div className="card">
      {heading && <h1>{heading}</h1>}
      {imageUrl && (
        <div className="image-box">
          <img src={imageUrl} alt={heading || 'Test Image'} />
        </div>
      )}
    </div>
  );
}
