import React from "react";

interface StarryCodeIconProps {
  className?: string;
}

export const StarryCodeIcon: React.FC<StarryCodeIconProps> = ({ className }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 64 64" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <path d="M28,2C16.402,2,7,11.402,7,23h5v-3h1.78c5.949,0,11.703-2.128,16.22-6V2H28z" fill="var(--vscode-foreground)"/>
        </g>
        <path d="M41,24c-2.757,0-5,2.243-5,5s2.243,5,5,5s5-2.243,5-5S43.757,24,41,24z M44,29c0,0.462-0.113,0.894-0.301,1.285L42.414,29l1.285-1.285C43.887,28.106,44,28.538,44,29z M42.285,26.301L41,27.586l-1.285-1.285C40.106,26.113,40.538,26,41,26S41.894,26.113,42.285,26.301z M38.301,30.285C38.113,29.894,38,29.462,38,29s0.113-0.894,0.301-1.285L39.586,29L38.301,30.285z M39.715,31.699L41,30.414l1.285,1.285C41.894,31.887,41.462,32,41,32S40.106,31.887,39.715,31.699z" fill="var(--vscode-foreground)"/>
        <g>
          <path d="M6,23h2C8,11.972,16.972,3,28,3h1v10.534C24.721,17.062,19.334,19,13.78,19H11v19c0,6.486,4.78,11.863,11,12.83V63h9V53h-2v8h-5V51h7V1h-3C15.869,1,6,10.869,6,23z M24,49c-6.065,0-11-4.935-11-11V21h0.78c5.48,0,10.81-1.741,15.22-4.938v26.796c-1.72-0.447-3-1.999-3-3.858h-2c0,2.967,2.167,5.431,5,5.91V49H24z" fill="var(--vscode-foreground)"/>
          <path d="M1,32c0,3.859,3.14,7,7,7h1V25H8C4.14,25,1,28.14,1,32z M7,36.899C4.721,36.435,3,34.415,3,32c0-2.415,1.721-4.435,4-4.899V36.899z" fill="var(--vscode-foreground)"/>
          <path d="M21,27c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S22.654,27,21,27z M21,31c-0.551,0-1-0.449-1-1s0.449-1,1-1s1,0.449,1,1S21.551,31,21,31z" fill="var(--vscode-foreground)"/>
          <path d="M56,25h-1v14h1c3.86,0,7-3.141,7-7C63,28.14,59.86,25,56,25z M57,36.899v-9.799c2.279,0.464,4,2.485,4,4.899C61,34.415,59.279,36.435,57,36.899z" fill="var(--vscode-foreground)"/>
          <path d="M33,21h18v17c0,6.065-4.935,11-11,11h-7v2h7c7.168,0,13-5.832,13-13V19H33V21z" fill="var(--vscode-foreground)"/>
          <path d="M40,1h-7v2h2v4h-2v2h4V3h2v8h-6v2h8V3.051C46.598,3.558,51,8.272,51,14v3h2v-3C53,6.832,47.168,1,40,1z" fill="var(--vscode-foreground)"/>
          <path d="M55,11h2V6.816C58.161,6.402,59,5.302,59,4c0-1.654-1.346-3-3-3s-3,1.346-3,3c0,1.302,0.839,2.402,2,2.816V11z M56,3c0.551,0,1,0.449,1,1s-0.449,1-1,1s-1-0.449-1-1S55.449,3,56,3z" fill="var(--vscode-foreground)"/>
          <path d="M45,41c0-2.206-1.794-4-4-4h-8v2h2v4h-2v2h8C43.206,45,45,43.206,45,41z M43,41c0,1.103-0.897,2-2,2v-4C42.103,39,43,39.897,43,41z M37,39h2v4h-2V39z" fill="var(--vscode-foreground)"/>
          <rect height="2" fill="var(--vscode-foreground)" width="2" x="34" y="15"/>
          <rect height="2" fill="var(--vscode-foreground)" width="2" x="39" y="15"/>
          <rect height="2" fill="var(--vscode-foreground)" width="2" x="44" y="15"/>
          <polygon points="41,53 39,53 39,57 33,57 33,59 46,59 46,61 33,61 33,63 48,63 48,57 41,57" fill="var(--vscode-foreground)"/>
          <rect height="10" fill="var(--vscode-foreground)" width="2" x="55" y="13"/>
        </g>
      </g>
    </svg>
  );
};