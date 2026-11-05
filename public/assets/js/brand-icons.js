// Inline vector technology marks: no icon font, image requests, or runtime service.
// Non-branded disciplines use semantic diagrams rather than invented company logos.
(()=>{
const wrap=(body,box='0 0 48 48')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" aria-hidden="true" focusable="false">${body}</svg>`;
const shield=(color,light,body)=>wrap(`<path fill="${color}" d="M6 3h36l-3.3 36L24 44l-14.7-5z"/><path fill="${light}" d="M24 6h14.7l-2.8 30.5L24 40.5z"/>${body}`);
const text=(value,x=24,y=31,size=22,fill='#fff')=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="${size}" fill="${fill}">${value}</text>`;
window.TechnologyIcons={
HTML5:shield('#e44d26','#f16529','<path fill="#fff" d="M13 11h23l-.5 5H19l.5 5h15.4l-1.2 13L24 37l-9.6-3-.6-7h5l.3 3.2 4.9 1.5 4.9-1.5.4-4.5H14.1z"/>'),
CSS3:shield('#1572b6','#33a9dc','<path fill="#fff" d="M13 11h23l-.5 5-11 5h10.4l-1.2 13L24 37l-9.6-3-.6-7h5l.3 3.2 4.9 1.5 4.9-1.5.4-4.5H14.1l-.4-4.7 11-5H13.5z"/>'),
JavaScript:wrap('<path fill="#f7df1e" d="M3 3h42v42H3z"/>'+text('JS',28,37,24,'#252626')),
React:wrap('<g fill="none" stroke="#149eca" stroke-width="2"><ellipse cx="24" cy="24" rx="22" ry="8"/><ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="22" ry="8" transform="rotate(120 24 24)"/></g><circle cx="24" cy="24" r="4" fill="#149eca"/>'),
'Tailwind CSS':wrap('<path fill="#06b6d4" d="M24 8C16 8 11 12 9 20c3-4 6.5-5.5 10.5-4.5 2.3.6 3.9 2.2 5.7 4.1C28.2 22.6 31.6 26 39 26c8 0 13-4 15-12-3 4-6.5 5.5-10.5 4.5-2.3-.6-3.9-2.2-5.7-4.1C34.8 11.4 31.4 8 24 8ZM9 26c-8 0-13 4-15 12 3-4 6.5-5.5 10.5-4.5 2.3.6 3.9 2.2 5.7 4.1C13.2 40.6 16.6 44 24 44c8 0 13-4 15-12-3 4-6.5 5.5-10.5 4.5-2.3-.6-3.9-2.2-5.7-4.1C19.8 29.4 16.4 26 9 26Z" transform="translate(5 1) scale(.78)"/>'),
Vite:wrap('<defs><linearGradient id="vite-blue" x2="1" y2="1"><stop stop-color="#41d1ff"/><stop offset="1" stop-color="#bd34fe"/></linearGradient></defs><path fill="url(#vite-blue)" d="m3 8 21 36L45 8 24 12z"/><path fill="#ffcf32" d="m27 1-13 24h11l-4 18L37 17H26z"/>'),
'Node.js':wrap('<path fill="#5fa04e" d="m24 2 20 11v22L24 46 4 35V13z"/>'+text('JS',24,31,21)),
PHP:wrap('<ellipse fill="#777bb3" cx="24" cy="24" rx="23" ry="14"/>'+text('php',24,30,20)),
Laravel:wrap('<g stroke="#ff2d20" stroke-width="2.1" fill="none" stroke-linejoin="round"><path d="m3 9 9-5 9 5v21l9 5 12-7V16l-9-5-9 5v12l-12 7-9-5z"/><path d="m3 9 9 5 9-5M12 14v21M24 16l9 5 9-5M33 21v12M12 35v8l18-10v-8"/></g>'),
MySQL:wrap('<path d="M5 30c6-12 18-15 29-8 5 3 8 7 10 9-6-2-9-1-12-2-4-1-6-4-10-4-4 0-6 2-8 6l1-7-10 6Zm27-8c-2-6-6-9-12-11 4 0 7 1 10 3l3-3 2 9M32 29l9 8-13-6" fill="none" stroke="#00758f" stroke-width="2" stroke-linejoin="round"/><circle cx="31" cy="22" r="1" fill="#f29111"/>'),
SQLite:wrap('<defs><linearGradient id="sqlite-blue" x2="1" y2="1"><stop stop-color="#0f80cc"/><stop offset="1" stop-color="#003b57"/></linearGradient></defs><path fill="url(#sqlite-blue)" d="M5 5h31v38H5z"/><path fill="#e5f5ff" d="M42 3C25 9 20 20 20 40l6-12 9-3-6-2 7-5-4-1 6-6-3-1z"/><path stroke="#003b57" fill="none" stroke-width="1.2" d="M23 40c2-15 8-26 17-35"/>'),
Firebase:wrap('<path fill="#ffca28" d="M7 36 13 3l8 15L27 7l14 29-17 10z"/><path fill="#ffa000" d="m7 36 14-18L13 3z"/><path fill="#f57c00" d="m7 36 20-29 5 10z"/><path fill="#ffca28" d="m7 36 25-19 9 19-17 10z"/>'),
AWS:wrap(text('aws',24,25,24,'#25364b')+'<path d="M5 32c12 8 26 9 38-1M37 30l7 1-3 6" fill="none" stroke="#f90" stroke-width="2.6" stroke-linecap="round"/>'),
'Google Cloud':wrap('<path d="M14 17a13 13 0 0 1 22-5l-5 6a6 6 0 0 0-11 4z" fill="#ea4335"/><path d="m29 11 6-3a14 14 0 0 1 8 14l-7 3a8 8 0 0 0-7-14" fill="#4285f4"/><path d="M37 18c13 1 14 20 0 22H24v-8h13c6 0 6-7 0-7z" fill="#4285f4"/><path d="M24 32H13v8h11z" fill="#34a853"/><path d="M14 18C0 17-3 37 13 40v-8c-6-1-5-8 1-7z" fill="#fbbc05"/>'),
Vercel:wrap('<path fill="#101820" d="m24 5 23 39H1z"/>'),
Git:wrap('<rect x="7" y="7" width="34" height="34" rx="3" fill="#f05032" transform="rotate(45 24 24)"/><path d="m13 12 17 17M20 19v16" stroke="#fff" stroke-width="3"/><g fill="#fff"><circle cx="20" cy="19" r="3.5"/><circle cx="20" cy="35" r="3.5"/><circle cx="30" cy="29" r="3.5"/></g>'),
GitHub:wrap('<path fill="#24292f" d="M24 1C11.3 1 1 11.3 1 24c0 10.2 6.6 18.9 15.7 22 .9.2 1.3-.4 1.3-.9v-4.4c-6.4 1.4-7.7-2.7-7.7-2.7-1-2.7-2.6-3.4-2.6-3.4-2.1-1.5.2-1.4.2-1.4 2.3.2 3.5 2.4 3.5 2.4 2 3.5 5.4 2.5 6.7 1.9.2-1.5.8-2.5 1.5-3.1-5.1-.6-10.4-2.6-10.4-11.4 0-2.5.9-4.6 2.4-6.2-.2-.6-1-3 .2-6.2 0 0 2-.6 6.3 2.4a21.8 21.8 0 0 1 11.5 0c4.4-3 6.3-2.4 6.3-2.4 1.3 3.2.5 5.6.3 6.2a9 9 0 0 1 2.4 6.2c0 8.8-5.3 10.8-10.4 11.4.8.7 1.5 2.1 1.5 4.3v6.4c0 .6.3 1.2 1.3 1C40.4 42.9 47 34.2 47 24 47 11.3 36.7 1 24 1Z"/>'),
'C#':wrap('<path fill="#68217a" d="m24 2 21 12v22L24 48 3 36V14z"/>'+text('C',20,33,29)+'<path stroke="#fff" stroke-width="1.5" d="M32 20v12M37 20v12M29 24h11M29 28h11"/>'),
Java:wrap('<g fill="none" stroke-linecap="round"><path stroke="#e76f00" stroke-width="2" d="M27 2c12 8-15 10-5 20M31 9c-11 8 6 9-3 15"/><path stroke="#5382a1" stroke-width="2" d="M10 26c0 12 23 12 23 0M10 26h23M34 26c11-2 11 9 0 9M6 39c12 5 26 4 35-1M10 44c10 3 21 2 28 0"/></g>'),
'REST APIs':wrap('<g fill="none" stroke="#54738a" stroke-width="2"><circle cx="24" cy="24" r="8"/><path d="M24 3v13M24 32v13M3 24h13M32 24h13"/><rect x="19" y="1" width="10" height="6" rx="1"/><rect x="19" y="41" width="10" height="6" rx="1"/><rect x="1" y="19" width="6" height="10" rx="1"/><rect x="41" y="19" width="6" height="10" rx="1"/></g>'),
'API Testing':wrap('<g fill="none" stroke="#54738a" stroke-width="2.5"><circle cx="20" cy="20" r="14"/><path d="m30 30 14 14M13 20l5 5 10-11"/></g>'),
'Database Design':wrap('<g fill="none" stroke="#54738a" stroke-width="2"><ellipse cx="24" cy="9" rx="17" ry="7"/><path d="M7 9v29c0 9 34 9 34 0V9M7 23c0 9 34 9 34 0M7 33c0 9 34 9 34 0"/></g>')
};
})();
