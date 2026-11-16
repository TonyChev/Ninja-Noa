/* ===== Maître Kuro, la mascotte ninja (SVG) ===== */
function mascotSVG(opts = {}) {
  const color = opts.color || '#e63946';
  const belt = opts.belt || '#f4f4f4';
  const mood = opts.mood || 'normal';
  const dark = '#23263f';
  let eyes;
  if (mood === 'happy') {
    eyes = `<path d="M70 92 Q80 80 90 92" stroke="#1a1a1a" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M110 92 Q120 80 130 92" stroke="#1a1a1a" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  } else if (mood === 'sad') {
    eyes = `<path d="M68 80 L90 85" stroke="${dark}" stroke-width="4" stroke-linecap="round"/><path d="M132 80 L110 85" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="80" cy="93" rx="6" ry="6" fill="#fff"/><circle cx="80" cy="95" r="3.5" fill="#1a1a1a"/>
            <ellipse cx="120" cy="93" rx="6" ry="6" fill="#fff"/><circle cx="120" cy="95" r="3.5" fill="#1a1a1a"/>
            <path d="M88 101 q2 6 0 8 q-2 -2 0 -8z" fill="#7cc6fe"/>`;
  } else {
    eyes = `<g class="m-eyes"><path d="M68 82 L90 86" stroke="${dark}" stroke-width="4" stroke-linecap="round"/><path d="M132 82 L110 86" stroke="${dark}" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="80" cy="93" rx="8" ry="8" fill="#fff"/><circle cx="82" cy="94" r="4.5" fill="#1a1a1a"/><circle cx="83.5" cy="92.5" r="1.5" fill="#fff"/>
            <ellipse cx="120" cy="93" rx="8" ry="8" fill="#fff"/><circle cx="118" cy="94" r="4.5" fill="#1a1a1a"/><circle cx="119.5" cy="92.5" r="1.5" fill="#fff"/></g>`;
  }
  return `<svg class="mascot mood-${mood}" viewBox="0 0 200 225" role="img" aria-label="Maître Kuro, le sensei ninja">
  <ellipse cx="100" cy="216" rx="52" ry="7" fill="rgba(0,0,0,.18)"/>
  <g class="m-body">
    <g class="m-tails">
      <path d="M150 62 Q178 52 196 70 Q175 66 156 72 Z" fill="${color}"/>
      <path d="M150 68 Q176 78 186 100 Q168 84 152 76 Z" fill="${color}" opacity=".9"/>
    </g>
    <path d="M56 210 Q50 142 100 136 Q150 142 144 210 Z" fill="${dark}"/>
    <path d="M100 138 L84 170 L100 160 L116 170 Z" fill="#3a3f66"/>
    <rect x="56" y="172" width="88" height="12" rx="4" fill="${belt}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
    <path d="M100 178 l-12 24 l9 -3 z M100 178 l12 24 l-9 -3 z" fill="${belt}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
    <g class="m-arm-l"><ellipse cx="52" cy="165" rx="12" ry="24" fill="${dark}" transform="rotate(22 52 165)"/><circle cx="44" cy="184" r="9" fill="#f6d5b8"/></g>
    <g class="m-arm-r"><ellipse cx="148" cy="165" rx="12" ry="24" fill="${dark}" transform="rotate(-22 148 165)"/><circle cx="156" cy="184" r="9" fill="#f6d5b8"/>
      <g class="m-star" transform="translate(166 172)"><path d="M0 -13 L4 -4 L13 0 L4 4 L0 13 L-4 4 L-13 0 L-4 -4 Z" fill="#c9ced6" stroke="#6c757d" stroke-width="1.5"/><circle r="2.5" fill="#6c757d"/></g></g>
    <circle cx="100" cy="86" r="58" fill="${dark}"/>
    <rect x="56" y="76" width="88" height="34" rx="17" fill="#f6d5b8"/>
    ${eyes}
    <path d="M44 60 Q100 42 156 60 L157 73 Q100 56 43 73 Z" fill="${color}"/>
    <circle cx="100" cy="56" r="8" fill="#ffd166" stroke="#c99700" stroke-width="1.5"/>
    <text x="100" y="60" text-anchor="middle" font-size="9" font-weight="800" fill="#8a5a00">忍</text>
  </g>
</svg>`;
}
