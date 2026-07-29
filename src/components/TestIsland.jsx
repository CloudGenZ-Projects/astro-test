import React from 'react';
import { useLivePreview } from '@payloadcms/live-preview-react';

export default function TestIsland({ initialData, cmsUrl }) {
  const { data } = useLivePreview({
    initialData,
    serverURL: cmsUrl,
    depth: 2,
  });

  const heading = data?.test_heading || initialData?.test_heading || 'No Heading Set';

  let imageUrl = null;
  const imgObj = data?.test_image || initialData?.test_image;
  if (imgObj) {
    if (typeof imgObj === 'object' && imgObj.url) {
      const rawUrl = imgObj.url;
      imageUrl = rawUrl.startsWith('http') ? rawUrl : `${cmsUrl}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
    } else if (typeof imgObj === 'string') {
      imageUrl = imgObj.startsWith('http') ? imgObj : `${cmsUrl}${imgObj.startsWith('/') ? '' : '/'}${imgObj}`;
    }
  }

  return (
    <div className="card">
      <span className="tag">Astro Island + React Live Preview</span>
      
      <div>
        <h1>Heading: <span>{heading}</span></h1>

        <div className="image-box">
          {imageUrl ? (
            <div>
              <p><strong>Uploaded Image from Payload CMS:</strong></p>
              <img src={imageUrl} alt="Test Image from Payload CMS" />
            </div>
          ) : (
            <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
              📷 Image is currently empty. Upload an image in Payload CMS Admin!
            </p>
          )}
        </div>
      </div>

      <div className="info">
        <p>⚡ <strong>How Astro Island Live Preview Works:</strong></p>
        <ul>
          <li>Pre-rendered at <strong>build time</strong> into 100% static HTML for maximum speed.</li>
          <li>Hydrated on client via <code>client:load</code> with <code>@payloadcms/live-preview-react</code>!</li>
          <li>Payload Admin updates state <strong>live in real-time as you type</strong>!</li>
        </ul>
      </div>
    </div>
  );
}
