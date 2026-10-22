import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { themes, masterPrompt } from './src/themes.mjs';

const root = fileURLToPath(new URL('.',import.meta.url));
const read = name => readFile(root+name,'utf8');
const [framework, css, js] = await Promise.all([read('framework/mui.css'),read('src/studio.css'),read('src/studio.js')]);
new vm.Script(js,{filename:'studio.js'});
const themeCss=themes.map(t=>`.skin[data-theme="${t.id}"]{--n0:${t.colors[1]};--n1:${t.colors[0]};--n2:${t.colors[6]};--n3:${t.colors[7]};--fg:${t.colors[2]};--fg3:${t.colors[3]};--ac:${t.colors[4]};--on-ac:${t.colors[5]};--ok-f:${t.colors[8]};--no-f:${t.colors[9]};--ff:${t.font};--display:${t.display};--radius:${t.radius}px}`).join('\n');
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
function html(t=null) {
  const title = t?`Pairs Pro / ${t.name} / Seven-screen design study`:'Pairs Pro / Twenty design directions';
  const data = `window.STUDY_THEMES=${JSON.stringify(themes)};window.STUDY_ID=${JSON.stringify(t?.id||null)};window.STUDY_PROMPT=${JSON.stringify(masterPrompt)};`;
  return `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="description" content="Twenty local Pairs Pro design studies. Five mobile screens and two desktop screens per direction. Demo data only."><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; connect-src 'none'; base-uri 'none'; form-action 'none'"><title>${escape(title)}</title><style>\n${framework}\n${css}\n${themeCss}\n</style></head><body><div id="root"></div><dialog id="dialog" class="studio-dialog" aria-label="Design preview dialog"></dialog><div id="toast" class="toast" role="status" hidden></div><noscript>This design study requires JavaScript to render its local, offline demo screens.</noscript><script>${data}\n${js}\n</script></body></html>\n`;
}
await writeFile(root+'index.html',html());
for(const t of themes) await writeFile(root+t.id+'.html',html(t));
await writeFile(root+'prompts.json',JSON.stringify({date:'2026-10-22',framework:'μi / shared HTML-CSS component layer',shared_prompt:masterPrompt,variants:themes.map(({colors,font,display,radius,brief,...t})=>({...t,prompt:brief+'\n\n'+masterPrompt}))},null,2)+'\n');
await writeFile(root+'PROMPTS.md','# Pairs Pro — design experiment prompts\n\nUse the shared brief, then append exactly one direction. Keep the same seven tasks and sample content when comparing outputs.\n\n## Shared brief\n\n'+masterPrompt+'\n\n'+themes.map(t=>'## '+t.id.slice(0,2)+' · '+t.name+'\n\n**Product archetype:** '+t.type+'\n\n'+t.brief).join('\n\n')+'\n');
function luminance(hex) {
  const parts=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
  return parts[0]*.2126+parts[1]*.7152+parts[2]*.0722;
}
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
const results=[];
for(const t of themes){
  for(const bg of [t.colors[0],t.colors[1],t.colors[6]]) for(const [label,fg] of [['body',t.colors[2]],['secondary',t.colors[3]],['positive',t.colors[8]]]) {
    const ratio=contrast(fg,bg);results.push({theme:t.id,text:label,fg,bg,ratio:+ratio.toFixed(2)});
    if(ratio<4.5)throw new Error(`Contrast ${t.id} ${label}: ${ratio.toFixed(2)}`);
  }
  const ratio=contrast(t.colors[4],t.colors[5]);results.push({theme:t.id,text:'primary button',ratio:+ratio.toFixed(2)});
  if(ratio<4.5)throw new Error(`Button contrast ${t.id}: ${ratio.toFixed(2)}`);
}
const hash = value => createHash('sha256').update(value).digest('hex');
await writeFile(root+'verification.json',JSON.stringify({date:'2026-10-22',variants:themes.length,mobile_screens_per_variant:5,desktop_screens_per_variant:2,standalone_html_files:themes.length+1,dependencies:0,network_policy:'connect-src none; no wallet provider',source_hashes:{framework:hash(framework),css:hash(css),js:hash(js),themes:hash(await read('src/themes.mjs'))},challenge_prompt_hash:hash(await read('CHALLENGE.md')),framework_source:'decouple/design/preview.html at 459d779916453dffe2207da79f1e312e506e6a7c; reset/theme/base/comp layers extracted using lib/ui.js',checks:{javascript_parse:'pass',theme_text_contrast:'pass',theme_button_contrast:'pass'},minimum_theme_text_or_button_contrast:Math.min(...results.map(x=>x.ratio)),contrast:results},null,2)+'\n');
console.log(`Built ${themes.length} seven-screen studies + gallery. ${results.length} palette contrast checks pass; minimum ${Math.min(...results.map(x=>x.ratio))}:1.`);
