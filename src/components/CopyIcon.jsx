import React, { useState } from 'react';
import './CopyIcon.css'; // External CSS for styling
import { ToastContainer, toast } from 'react-toastify';

const CopyIcon = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast('Copied to clipboard!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="icon-wrapper" onClick={handleCopy} title={copied ? 'Copied!' : 'Click to copy'}>
      {/* Copy Icon SVG */}
      <svg
        className={`copy-icon ${copied ? 'hidden' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#141B34"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="10" height="12" rx="2" ry="2" />
        <rect className="back" x="5" y="5" width="10" height="12" rx="2" ry="2" />
      </svg>

      {/* Check Icon SVG */}
      <svg
        className={`check-icon ${copied ? 'visible' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
};

export default CopyIcon;
