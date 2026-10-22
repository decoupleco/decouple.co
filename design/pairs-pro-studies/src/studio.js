/* Shared μi study renderer. Deterministic demo data; no wallet, network or transaction code. */
(() => {
  'use strict';
  const themes = window.STUDY_THEMES;
  const current = window.STUDY_ID;
  const master = window.STUDY_PROMPT;
  const state = { scenario:'normal', focus:'board', phoneWidth:390, redeemMode:'instant', selected:new Set(['01-ledger','03-orchard','07-swiss']), compareScreen:'m01', collection:['all','original','new'].includes(new URLSearchParams(location.search).get('collection'))?new URLSearchParams(location.search).get('collection'):'all' };
  let confirmAction = null;
  let toastTimer;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = (n, d=2) => Number(n).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
  const fmt = (n,d=2) => Number(n).toLocaleString('en-US',{maximumFractionDigits:d});
  const value = 12480.22;
  const ownValue = 8400;
  const price = 2431.50;
  const pps = 1.7154;
  const poolShares = ownValue / pps;
  const redeemBalance = Math.floor(poolShares * 10000) / 10000;
  const fullBase = ownValue / 2 / price;
  const fullQuote = ownValue / 2;
  const configDefaults = { base:5, limit:3, chase:67, weight:80, target:50, tolerance:30 };
  const screenNames = {m01:'Portfolio',m02:'Pools',m03:'Pool detail',m04:'Deposit',m05:'Withdraw',d01:'Pool workspace',d02:'Strategy settings'};
  const iconPaths = {
    arrow:'M4 10h12m-5-5 5 5-5 5', back:'M15 10H4m5-5-5 5 5 5',
    portfolio:'M3 6h14v11H3zM7 6V3h6v3M3 10h14M8 10v3h4v-3',
    pools:'M3 4h5v5H3zM12 4h5v5h-5zM3 13h5v5H3zM12 13h5v5h-5z',
    activity:'M2 11h4l3-7 3 12 3-6h3', wallet:'M3 5h13v12H3zM3 5V3h11v2m-2 5h6v4h-6z',
    search:'M8.5 3a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11m4 10 4.5 4.5',
    info:'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m0 7v5m0-9v1',
    check:'M4 10l4 4 8-8', settings:'M3 5h14M3 10h14M3 15h14M7 3v4m6 1v4m-5 1v4',
    shield:'M10 2l7 3v5c0 4-7 8-7 8s-7-4-7-8V5zM6.5 10l2.5 2.5 4.5-5',
    external:'M11 3h6v6m0-6-8 8M8 4H3v13h13v-5',
    more:'M4 10h.01M10 10h.01M16 10h.01', clock:'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m0 4v5l3 2'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 20 20" aria-hidden="true"><path d="${iconPaths[name] || iconPaths.info}"/></svg>`;
  const symbol = '<span class="brand-symbol" aria-hidden="true"><i></i><i></i></span>';
  const brand = () => `<span class="product-brand">${symbol}<span>pairs<em>.pro</em></span></span>`;
  const action = (label,a='info',cls='',attrs='') => `<button type="button" class="btn ${cls}" data-action="${a}" ${attrs}>${label}</button>`;
  const tokenPair = (a='WETH',b='USDC',large=false) => `<span class="token-pair${large?' large':''}" aria-hidden="true"><i class="${a==='WETH'?'eth':a==='cbBTC'?'btc':''}">${a==='WETH'?'◇':a==='cbBTC'?'₿':'A'}</i><i class="usdc">${b==='WETH'?'◇':'$'}</i></span>`;
  const returnText = () => state.scenario==='history' ? '<span class="muted">History unavailable</span>' : '<span class="positive">↗ $618.08 <span>· +5.21%</span></span><span class="muted">30 days</span>';
  const title = (name,sub='',number='') => `<div class="screen-title"><div><h1>${name}</h1>${sub?`<p>${sub}</p>`:''}</div>${number?`<span class="title-number">${number}</span>`:''}</div>`;
  const source = () => `<details class="data-note"><summary>Sample data · source &amp; snapshot ${icon('info')}</summary><p>Illustrative fixture · block 31,204,118. Prices and balances are sample observations; USD values and APY are derived examples. No live data, real quote or historical performance is represented.</p></details>`;
  const status = () => '<span class="pill status">Base network</span>';
  const alert = () => state.scenario==='wrong-network' ? '<div class="state-alert"><strong>Wallet on Ethereum · pool on Base</strong>Data stays visible. Switch networks before reviewing an action.</div>' : state.scenario==='history' ? '<div class="state-alert"><strong>History unavailable</strong>Sample RPC balances and redemption quotes are still available.</div>' : '';
  const permission = () => state.scenario==='holder' ? '<div class="permission-note"><strong>Holder access.</strong> Deposit requires the user role. Your right to withdraw is unchanged.</div>' : state.scenario==='disconnected' ? '<div class="permission-note">Connect a wallet to review your own position.</div>' : '';
  function primary(label, a, attrs='') {
    if(state.scenario==='wrong-network') return action('Switch to Base','switch-network','',`data-p ${attrs}`);
    if(state.scenario==='disconnected') return action('Connect wallet','connect','',`data-p ${attrs}`);
    if(state.scenario==='holder' && (a==='deposit-review'||a==='go-deposit')) return action('Deposit requires user role',a,'',`data-p disabled ${attrs}`);
    return action(label,a,'',`data-p ${attrs}`);
  }
  const spark = () => '<svg class="spark" viewBox="0 0 80 30" aria-hidden="true"><path d="M1 24 7 21 12 23 18 17 24 19 29 14 36 17 41 10 48 13 55 8 61 11 67 5 73 8 79 3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
  function lineChart(kind='equity',height=120,period='30D') {
    const seed = period==='7D'?1:period==='All'?3:2;
    const values = Array.from({length:45},(_,i) => 50 + i*.95 + Math.sin(i*.53+seed)*5 + Math.cos(i*.16)*7);
    const points = values.map((v,i)=>[i/44*320,106-(v-42)*1.5]);
    const path = points.map((p,i)=>(i?'L':'M')+p.map(x=>x.toFixed(1)).join(' ')).join(' ');
    return `<svg class="chart ${kind==='equity'?'performance-chart':''}" viewBox="0 0 320 120" preserveAspectRatio="none" role="img" aria-label="Illustrative ${period} ${kind==='equity'?'portfolio value':'price'} chart"><path class="gridline" d="M0 20H320M0 60H320M0 100H320"/><path class="trend-fill" d="${path}L320 118H0Z"/><path class="trend" d="${path}"/></svg>`;
  }
  function priceChart(mode='1H candles',period='7D') {
    const line = Array.from({length:34},(_,i)=>42+Math.sin(i*.38+(period==='7D'?0:period==='30D'?1:2))*20+Math.cos(i*.14)*5+i*.7);
    let candles='';
    line.forEach((v,i)=>{const x=i/33*310+5,y=118-v,up=i%4!==1; candles+=`<g class="candle ${up?'up':''}"><path d="M${x} ${y-7}V${y+14}"/><rect x="${x-2.2}" y="${y}" width="4.4" height="${5+i%7}"/></g>`;});
    const d=line.map((v,i)=>(i?'L':'M')+`${(i/33*310+5).toFixed(1)} ${(118-v).toFixed(1)}`).join(' ');
    return `<svg class="chart pool-chart" viewBox="0 0 320 160" preserveAspectRatio="none" role="img" aria-label="Illustrative ${period} ${mode}; base and limit bands, projected at left and keeper-run at right"><path class="gridline" d="M0 25H320M0 65H320M0 105H320M0 145H320"/><g class="chart-bands"><path class="base-band projected-band" d="M0 37H80V130H0Z"/><path class="base-band" d="M80 28H180V20H320V118H180V124H80Z"/><path class="limit-band projected-band" d="M0 31H80V82H0Z"/><path class="limit-band" d="M80 22H180V15H320V62H180V72H80Z"/><path class="ema-line" d="M0 91H80V84H180V69H320"/></g>${mode==='Line'?`<path class="trend" d="${d}"/>`:candles}<line x1="0" x2="320" y1="78" y2="78" stroke="var(--fg3)" stroke-width=".8" stroke-dasharray="2 4"/></svg>`;
  }
  const chartLegend = () => '<div class="chart-legend"><span><i></i>Base band</span><span><i class="limit-key"></i>Limit band</span><span><i class="dashed"></i>Projected</span></div>';
  const periods = () => '<div class="seg" role="group" aria-label="Portfolio period">'+['7D','30D','All'].map(p=>`<button type="button" data-action="equity-period" data-period="${p}" aria-pressed="${p==='30D'}">${p}</button>`).join('')+'</div>';
  const equity = () => state.scenario==='history' ? '<div class="loading-placeholder">Historical value is unavailable.<br>Current holdings remain visible.</div>' : `<div class="chart-block" data-equity><div class="chart-head"><strong>Portfolio value</strong>${periods()}</div><div data-equity-chart>${lineChart()}</div><div class="chart-axis"><span>20 Sep</span><span data-equity-period-label>30-day sample</span><span>20 Oct</span></div></div>`;
  const metrics = () => `<div class="compact-metrics"><div><label>Deposited capital</label><b>$11,862.14</b></div><div><label>Fees · 30D est.</label><b>${state.scenario==='history'?'—':'$238.14'}</b></div><div><label>Across</label><b>3 pools</b></div></div>`;
  function hero(t) {
    const v=`<div class="value">$${money(value)}</div>`;
    const r=`<div class="return-label">${returnText()}</div>`;
    const allocationRows = () => `<div class="allocation-ladder" aria-label="Position allocation">${[['WETH / USDC','67.3','$8,400.00'],['cbBTC / USDC','23.1','$2,880.22'],['AERO / USDC','9.6','$1,200.00']].map(([name,percent,total],i)=>`<div><span>${name}</span><b>${total}</b><div class="ladder-track"><i style="width:${percent}%"></i></div><small>${percent}%</small></div>`).join('')}</div>`;
    if(t.layout==='statement') return `<div class="statement-value"><div class="statement-kicker"><span>01 / POSITION STATEMENT</span><span>USD</span></div>${v}<div class="statement-delta"><span>Change / 30 days</span>${r}</div></div>${metrics()}`;
    if(t.layout==='treasury') return `<div class="treasury-value"><div class="value-label">Total liquidity · USD</div>${v}${r}</div>${allocationRows()}`;
    if(t.layout==='curated') return `<div class="curated-value"><div class="value-label">Your capital / a current view</div>${v}<div class="curated-note"><span class="curated-mark">↗</span>${r}</div></div>${metrics()}`;
    if(t.layout==='quant') return `<div class="quant-value"><div class="quant-total"><div class="value-label">NET VALUE / USD</div>${v}</div><div><label>DELTA / 30D</label><b>${state.scenario==='history'?'—':'+$618.08'}</b></div><div><label>CHANGE / 30D</label><b>${state.scenario==='history'?'—':'+5.21%'}</b></div></div>${metrics()}`;
    if(t.layout==='craft') return `<div class="craft-value"><div class="value-label">Your position, today</div>${v}<div class="craft-return">${r}</div><div class="allocation-strip" role="img" aria-label="67.3% WETH, 23.1% cbBTC, 9.6% AERO"><i></i><i></i><i></i></div><span class="craft-foot">THREE POSITIONS / BASE NETWORK</span></div>${metrics()}`;
    if(t.layout==='digest') return `<div class="digest-head"><span>THE POSITION DIGEST</span><span>20 OCT / DEMO</span></div><div class="digest-value"><div><div class="value-label">Current value</div>${v}</div><div class="digest-change"><span class="value-label">Over 30 days</span>${r}</div></div>${metrics()}`;
    if(t.layout==='instrument') return `<div class="instrument-value"><div class="value-label">PORTFOLIO / USD</div>${v}${r}<div class="instrument-bar" aria-label="Allocation: 67.3% WETH, 23.1% cbBTC, 9.6% AERO"><i></i><i></i><i></i></div><div class="instrument-key"><span>WETH<b>67.3%</b></span><span>cbBTC<b>23.1%</b></span><span>AERO<b>9.6%</b></span></div></div>${metrics()}`;
    if(t.layout==='nordic') return `<div class="nordic-value"><div class="value-label">Your positions, together</div>${v}<div class="nordic-note">${r}<span class="nordic-marker">03<span>pools</span></span></div></div>${metrics()}`;
    if(t.layout==='bank') return `<div class="bank-value"><div class="bank-label"><span>YOUR LIQUIDITY</span><span>BASE / 03</span></div>${v}<div class="bank-return">${r}</div></div>${metrics()}`;
    if(t.layout==='planner') return `<div class="task-sequence" aria-label="Product journey"><span><b>01</b>Observe</span><span><b>02</b>Understand</span><span><b>03</b>Act</span></div><div class="planner-value"><div><div class="value-label">Position value · USD</div>${v}</div><div class="planner-change">${r}</div></div>${metrics()}`;
    if(t.layout==='matrix') return `<div class="portfolio-matrix"><div class="wide"><label>01 / NET POSITION VALUE</label>${v}</div><div><label>30D CHANGE</label><b class="positive">${state.scenario==='history'?'Unavailable':'+5.21%'}</b></div><div><label>POOLS / NETWORKS</label><b>03 / Base</b></div></div>`;
    if(t.layout==='companion') return `<div class="companion-hero"><div class="allocation-ring" role="img" aria-label="Allocation: WETH 67.3%, cbBTC 23.1%, AERO 9.6%"></div><div><div class="value-label">Your liquidity</div>${v}${r}</div></div>${metrics()}`;
    if(t.layout==='terminal') return `<div class="terminal-value"><div><div class="mini-label">NET ASSET VALUE / USD</div>${v}</div><div class="terminal-return">${state.scenario==='history'?'—':'+5.21%'}<div class="mini-label">30D</div></div></div>${metrics()}`;
    if(t.layout==='editorial') return `<div class="editorial-value"><div class="value-label">Your capital at work</div>${v}${r}</div>${metrics()}`;
    if(t.layout==='research') return `<div class="research-value"><div><div class="value-label">Total position value</div>${v}${r}</div>${spark()}</div>${metrics()}`;
    if(t.layout==='swiss') return `<div class="swiss-value"><div><div class="value-label">POSITION VALUE / USD</div>${v}</div><div class="return-label">${state.scenario==='history'?'History unavailable':'<span class="positive">+5.21%</span><br>+$618.08<br><span class="muted">30 days</span>'}</div></div>${metrics()}`;
    if(t.layout==='operations') return `<div class="ops-strip"><span>3 POOLS / BASE</span><span>SAMPLE SNAPSHOT</span></div><div class="operations-value"><div class="value-label">Your position value</div>${v}${r}</div>${metrics()}`;
    if(t.layout==='broker') return `<div class="broker-hero"><div class="hero-top"><div><div class="value-label">Total portfolio value</div>${v}</div><div class="allocation-ring" aria-hidden="true"></div></div>${r}<div class="hero-context"><span>3 positions</span><span>Base network</span></div></div>`;
    return `<div class="hero-block"><div class="value-label">Total position value</div>${v}${r}<div class="allocation-strip" role="img" aria-label="67.3% WETH pool, 23.1% cbBTC pool, 9.6% AERO pool"><i></i><i></i><i></i></div><div class="hero-context"><span>3 positions <b>· Base</b></span><span>Est. fees <b>${state.scenario==='history'?'—':'$238.14'}</b></span></div></div>`;
  }
  const holdings = [ ['WETH','USDC','VeloV3 · 0.05% fee',8400,'+4.82%'],['cbBTC','USDC','UniV3 · 0.30% fee',2880.22,'+6.14%'],['AERO','USDC','VeloV3 · 0.30% fee',1200,'+5.76%'] ];
  const positionRows = () => holdings.map(([a,b,meta,v,change])=>`<button type="button" class="position-row" data-action="${a==='WETH'?'go-pool':'pool-example'}" data-pair="${a} / ${b}"><span class="position-left">${tokenPair(a,b)}<span><h3>${a} / ${b}</h3><p>${meta}</p></span></span><span class="position-amount"><b>$${money(v)}</b><p>${state.scenario==='history'?'Return unavailable':change+' · 30D'}</p></span></button>`).join('');
  function portfolio(t) {
    if(state.scenario==='disconnected') return `${title('Your portfolio','Your positions, all in one place.')}<div class="empty-state">${icon('wallet')}<h2 style="margin:16px 0 8px">See your liquidity.</h2><p>Connect a wallet to see your positions and available exits.</p></div>`;
    return `${title(t.layout==='terminal'?'Portfolio / 03':'Your portfolio',t.layout==='editorial'?'A view of your liquidity across three pools.':'A clear view of what you hold.',t.layout==='swiss'?'01':'')}${alert()}${hero(t)}${equity()}<div class="content-head"><h2>${t.layout==='editorial'?'Your holdings':'Positions'}</h2><span class="small muted">3 on Base</span></div>${positionRows()}${source()}`;
  }
  const pools = [
    {a:'WETH',b:'USDC',dex:'UniV3',network:'Base',fee:'0.05%',ts:10,tvl:'$184.2M',apy:'12.4%',price:'2,431.50'},
    {a:'WETH',b:'USDC',dex:'VeloV3',network:'Base',fee:'0.05%',ts:100,tvl:'$41.0M',apy:'21.1%',price:'2,431.50'},
    {a:'cbBTC',b:'USDC',dex:'UniV3',network:'Base',fee:'0.30%',ts:60,tvl:'$62.1M',apy:'8.9%',price:'97,412.00'},
    {a:'AERO',b:'USDC',dex:'VeloV3',network:'Base',fee:'0.30%',ts:200,tvl:'$9.3M',apy:'34.6%',price:'1.284'}
  ];
  function poolList() {
    return `${title('Explore pools','Public data. Your choice of liquidity.')}<div class="search-box">${icon('search')}<input class="field" type="search" placeholder="Token, pair or pool address" aria-label="Search pools" data-pool-search></div><div class="pool-filter-controls"><label><span>DEX</span><select class="field" aria-label="DEX filter" data-pool-dex><option value="All">All DEX types</option><option>UniV3</option><option>VeloV3</option></select></label><label><span>Network</span><select class="field" aria-label="Network filter" data-pool-network><option>Base</option><option value="All">All networks</option><option>Ethereum</option><option>Mezo</option><option>Arc</option></select></label></div><div class="content-head"><h2>Available pools</h2><span class="small muted" data-pool-count>4 pools</span></div><div data-pool-list>${pools.map(p=>`<button type="button" class="pool-card" data-action="${p.a==='WETH'&&p.dex==='VeloV3'?'go-pool':'pool-example'}" data-pair="${p.a} / ${p.b} · ${p.dex}" data-dex="${p.dex}" data-network="${p.network}" data-search="${p.a} ${p.b} ${p.dex}"><div class="pool-card-top"><span class="position-left">${tokenPair(p.a,p.b)}<span><h3>${p.a} / ${p.b}</h3><span class="metadata">${p.dex} · ${p.network} · ${p.fee} fee</span></span></span>${spark()}</div><div class="pool-card-metrics"><div><small>Pool TVL</small><b>${p.tvl}</b></div><div><small>Est. APY · 30D</small><b>${state.scenario==='history'?'Unavailable':p.apy}</b></div><div><small>Price · ${p.b}</small><b>${p.price}</b></div></div></button>`).join('')}<div class="empty-state" data-no-pools hidden>No matching pools.<br>Try another network, DEX or token symbol.</div></div><div class="permission-note">APY is a variable estimate. Compare the pool, vault strategy and exit model before adding liquidity.</div>${source()}`;
  }
  const pairHeading = (queued=false,level='h1') => `<div class="pair-heading">${tokenPair('WETH','USDC',true)}<div><${level}>WETH / USDC</${level}><p>${queued?'AeroCL2 · Arc · queued exit':'VeloV3 · Base · 0.05% fee'}</p></div></div>`;
  const poolMetrics = desktop => {
    const missing=state.scenario==='history';
    const metric=(label,value,unit='',extra='')=>`<div><small class="metric-label">${label}${unit?` <span class="metric-unit">· ${unit}</span>`:''}</small><b class="metric-value ${value==='Unavailable'?'is-unavailable':''}">${value}</b>${extra}</div>`;
    return `<div class="pool-metrics header-metrics" aria-label="Pool metrics">${metric('WETH price','2,431.50','USDC',missing?'<span class="metric-change muted">24h change unavailable</span>':'<span class="metric-change positive">+1.20% <span class="muted">· 24h</span></span>')}${metric('Pool TVL','$41.0M')}${metric('Vault TVL','$2.42M')}${metric('Est. APY',missing?'Unavailable':'21.1%','30D')}${metric('Fees',missing?'Unavailable':'$31.0k','30D')}</div>`;
  };
  function chartPanel() {
    if(state.scenario==='history') return '<div class="loading-placeholder">Price history is unavailable.<br>The current sample quote is still visible.</div>';
    return `<div data-price-panel><div class="chart-toolbar"><select aria-label="Chart type" data-chart-type><option>1H candles</option><option>1D candles</option><option>Line</option></select><div class="period" role="group" aria-label="Price history period">${['7D','30D','All'].map((x,i)=>`<button type="button" data-action="price-period" data-period="${x}" aria-pressed="${!i}">${x}</button>`).join('')}</div></div><div class="chartbox" tabindex="0" role="group" aria-label="Sample price chart, use left and right arrows" data-price-chart>${priceChart()}</div><div class="chart-axis"><span>13 Oct</span><span>20 Oct · 2026</span></div><div class="chart-footer">${chartLegend()}<label class="check range-switch"><input type="checkbox" data-chart-bands checked><span>Show range</span></label></div><p class="chart-readout" data-chart-readout>Solid = keeper-run · dashed = projected · demo only.</p></div>`;
  }
  function ranges() {
    return `<div class="range-list" data-ranges><div class="range-unit-control"><span>Strategy allocation</span><button type="button" data-action="range-units" aria-pressed="false">Price ⇄ ticks</button></div><div class="range-row"><div class="row"><span>Base <small class="muted" data-range-base-weight>80%</small></span><b data-price="2,289.70 — 2,581.80" data-ticks="200,940 — 202,140">2,289.70 — 2,581.80</b></div><div class="range-track"><i class="range-band"></i><i class="current-marker"></i></div></div><div class="range-row"><div class="row"><span>Limit <small class="muted" data-range-limit-weight>20%</small></span><b data-price="2,446.10 — 2,540.90" data-ticks="201,600 — 201,980">2,446.10 — 2,540.90</b></div><div class="range-track"><i class="range-band limit-band"></i><i class="current-marker"></i></div></div><p class="range-state"><span data-range-units>Prices in USDC per WETH</span> · Base active; limit waiting.</p></div>`;
  }
  function yourPosition(desktop=false) {
    const guest=state.scenario==='disconnected';
    const change=guest?'—':state.scenario==='history'?'Unavailable':'+4.82%';
    return `<section class="your-position blocks-position" aria-label="Your liquidity position"><header class="position-card-head"><div class="position-card-identity">${tokenPair()}<div><h2>WETH / USDC</h2><p>Your position · ${guest?'Guest':'Holder'}</p></div></div><span class="pill status">Base in range</span></header><div class="position-range" aria-label="Base range in USDC per WETH"><div class="position-range-track"><i></i><b></b></div><div class="position-range-labels"><span><b>2,289.70</b>Min</span><span><b>2,431.50</b>Current · USDC</span><span><b>2,581.80</b>Max</span></div></div><dl class="position-card-rows"><div><dt>Liquidity</dt><dd><strong>${guest?'—':'$8,400.00'}</strong><small>${guest?'Connect to see your position.':fmt(fullBase,4)+' WETH + '+money(fullQuote)+' USDC'}</small></dd></div><div><dt>Return · 30D</dt><dd><strong class="${guest||state.scenario==='history'?'muted':'positive'}">${change}</strong>${state.scenario==='history'?'<small>Return history unavailable</small>':''}</dd></div><div><dt>Rewards est.</dt><dd><strong>${guest?'—':'12.40 AERO'}</strong><small>Not a claimable quote</small></dd></div></dl>${guest?'':`<p class="position-share-note">${money(redeemBalance,4)} shares <span>· 0.35% of vault</span></p>`}${desktop?`<div class="position-card-actions">${primary('Add liquidity','go-deposit')}${action('Withdraw','go-redeem','ghost')}</div>`:''}</section>`;
  }
  const poolDetail = () => `<header class="pool-summary">${poolMetrics(false)}</header>${alert()}${chartPanel()}${yourPosition()}${permission()}${secondaryCharts()}${ranges()}${source()}`;
  const reviewLines = lines => `<dl class="review-lines">${lines.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>`;
  function amountCard(symbol,amount,balance) {
    return `<div class="amount-card"><div class="amount-top"><span>You provide</span><span>Balance ${balance} ${symbol}</span></div><label class="amount-entry"><input aria-label="${symbol} amount" inputmode="decimal" type="text" value="${amount}" data-amount="${symbol}"><span class="token-name">${symbol==='WETH'?'◇':'$'} ${symbol}</span></label><div class="amount-bottom"><span data-amount-usd="${symbol}">$1,215.75</span><button type="button" data-action="max-amount" data-token="${symbol}" data-max="${symbol==='WETH'?'3.1402':'12480.22'}">Use max</button></div></div>`;
  }
  function deposit() {
    return `${title('Add liquidity','Choose your token amounts.')}<div class="flow-stage"><strong>1 · Amounts</strong><i></i><span>2 · Review</span><i></i><span>3 · Wallet</span></div>${alert()}${permission()}${amountCard('WETH','0.5000','3.1402')}<div class="plus-separator">+</div>${amountCard('USDC','1,215.75','12,480.22')}<div class="form-error" role="status" data-deposit-error></div>${reviewLines([['Deposit value','<span data-deposit-value>$2,431.50</span>'],['Est. shares','<span data-deposit-shares>1,417.45</span>'],['Minimum shares','<span data-deposit-min>1,410.36</span><span class="muted">0.5% slippage limit</span>'],['Token approvals','Exact amounts only'],['Network fee','$0.42 est.'],['Deadline','10 minutes']])}<div class="permission-note">Your final token spend and shares depend on the fresh quote. Review minimum shares before signing.</div>${source()}`;
  }
  function redeem() {
    const queued = state.redeemMode!=='instant';
    return `${title('Withdraw liquidity',queued?(state.redeemMode==='claimable'?'Settled tokens ready to claim.':'Request an exit, then claim after settlement.'):'Receive WETH and USDC in kind.')}<div class="flow-label">Holder access · no deposit role required</div>${alert()}<div class="amount-card"><div class="amount-top"><span>Shares to withdraw</span><span>Available ${money(redeemBalance,4)}</span></div><label class="amount-entry"><input aria-label="Shares to withdraw" type="text" inputmode="decimal" value="${money(poolShares/2)}" data-redeem-shares><span class="token-name">shares</span></label><div class="amount-bottom"><span data-redeem-percent>50% of your position</span><span data-redeem-usd>$4,200.00</span></div></div><div class="percentage-row" role="group" aria-label="Withdrawal percentage">${[25,50,75,100].map(v=>`<button type="button" data-action="redeem-percent" data-percent="${v}" aria-pressed="${v===50}">${v}%</button>`).join('')}</div><div class="form-error" role="status" data-redeem-error></div><div class="receive-card"><label>Estimated tokens returned</label><div class="row"><span>◇ WETH</span><b data-receive-base>${fmt(fullBase/2,4)}</b></div><div class="row"><span>$ USDC</span><b data-receive-quote>${money(fullQuote/2)}</b></div><div class="minimum" data-receive-min>Minimum ${fmt(fullBase/2*.995,4)} WETH + ${money(fullQuote/2*.995)} USDC</div></div>${queued?`<div class="timeline"><div class="done">1 · Requested</div><div class="${state.redeemMode==='claimable'?'done':'current'}">2 · Maturity</div><div class="${state.redeemMode==='claimable'?'done':''}">3 · Settled</div><div class="${state.redeemMode==='claimable'?'current':''}">4 · Claim</div></div><div class="permission-note"><strong>${state.redeemMode==='claimable'?'Settled · ready to claim':'Queued exit · not yet mature'}</strong><br>${state.redeemMode==='claimable'?'Your settled tokens can now be claimed.':'Estimated maturity in ≈ 2 hours. Claim remains unavailable until maturity and settlement.'}</div>`:reviewLines([['Exit model','Immediate'],['Minimums','0.5% below quote'],['Network fee','$0.36 est.'],['Deadline','10 minutes']])}<div class="permission-note">${queued?'This is a separate venue example, not the Base pool exit model.':'Receive both tokens in kind. Review the token amounts before continuing.'}</div>${source()}`;
  }
  const header = id => {
    const contextual=['m03','m04','m05'].includes(id),queued=id==='m05'&&state.redeemMode!=='instant';
    const identity=contextual?`<div class="mobile-pool-identity"><button type="button" class="pool-back" data-action="go-pools" aria-label="Back to pools">${icon('back')}</button>${pairHeading(queued,id==='m03'?'h1':'h2')}</div>`:brand();
    return `<div class="status-bar" aria-hidden="true"><span>9:41</span><span>▮▮▮  ▰</span></div><header class="product-header ${contextual?'pool-context-header':''}">${identity}<div class="header-end"><span class="demo-label">Demo</span><button type="button" class="round-button" data-action="${state.scenario==='disconnected'?'connect':'wallet'}" aria-label="${state.scenario==='disconnected'?'Connect wallet':'Wallet details'}">${icon('wallet')}</button></div></header>`;
  };
  const nav = active => `<nav class="nav-bar" aria-label="Mobile navigation">${[['pools','Pools','m02'],['portfolio','Portfolio','m01'],['activity','Activity',''],['wallet','Wallet','']].map(([i,label,target])=>`<button type="button" data-action="${target?'go-screen':i}" ${target?`data-target="${target}"`:''} ${active===label?'aria-current="page"':''}>${icon(i)}<span>${label}</span></button>`).join('')}</nav>`;
  function mobile(t,id,mini=false) {
    const body = id==='m01'?portfolio(t):id==='m02'?poolList():id==='m03'?poolDetail():id==='m04'?deposit():redeem();
    let bottom='';
    if(id==='m01'&&state.scenario!=='disconnected') bottom=action('Explore pools','go-pools','', 'data-p');
    if(id==='m01'&&state.scenario==='disconnected') bottom=action('Connect wallet','connect','', 'data-p');
    if(id==='m03') bottom=primary('Add liquidity','go-deposit')+action('Withdraw','go-redeem','ghost');
    if(id==='m04') bottom=primary('Review deposit','deposit-review');
    if(id==='m05') bottom=state.redeemMode==='queued'?action('Waiting for maturity','redeem-review','', 'data-p disabled'):primary(state.redeemMode==='claimable'?'Claim tokens':'Review withdrawal',state.redeemMode==='claimable'?'claim-review':'redeem-review');
    return `<section class="app-screen mobile skin" data-theme="${t.id}" data-layout="${t.layout}" data-dark="${['terminal','night','quant'].includes(t.layout)}" data-frame="${id}" aria-label="${screenNames[id]} design preview">${header(id)}<main class="app-main">${body}</main>${bottom?`<div class="action-zone">${bottom}</div>`:''}${nav(id==='m02'||id==='m03'?'Pools':'Portfolio')}</section>`;
  }
  function rail(config=false) {
    return `<aside class="desktop-rail"><div><p class="rail-label">WORKSPACE</p><button type="button" data-action="go-pools">${icon('pools')}Pools</button><button type="button" data-action="go-screen" data-target="m01">${icon('portfolio')}Portfolio</button><button type="button" data-action="activity">${icon('activity')}Activity</button></div><div><p class="rail-label">CURRENT POOL</p><button type="button" class="${config?'':'active'}" data-action="go-screen" data-target="d01">◇ WETH / USDC</button><button type="button" class="${config?'active':''}" data-action="go-screen" data-target="d02">${icon('settings')}Strategy settings</button></div><div class="bottom"><button type="button" data-action="wallet">${icon('wallet')}0x5610…283e</button><p>Base network<br>Design preview · demo data</p></div></aside>`;
  }
  const desktopTop = config => `<header class="desktop-top compact-pool-header"><div class="desktop-pool-identity">${brand()}<button type="button" class="pool-back" data-action="go-pools" aria-label="Back to pools"><span>Pools</span></button><span class="pool-header-divider" aria-hidden="true">/</span>${pairHeading(false,config?'h2':'h1')}${config?'<span class="header-location">Settings</span>':''}</div><div class="header-end"><span class="demo-label">Demo</span>${state.scenario==='disconnected'?action('Connect wallet','connect','ghost'):action('0x5610…283e','wallet','ghost')}</div></header>`;
  function positionTable() {
    const rows=[['Base',412.18,1003200],['Limit',0,408110],['Idle',1.42,2544]];
    const totalBase=rows.reduce((sum,x)=>sum+x[1],0),totalQuote=rows.reduce((sum,x)=>sum+x[2],0);
    const row=(label,base,quote)=>`<tr><th scope="row">${label}</th><td>${money(base,2)}</td><td>${money(quote,0)}</td><td>$${money(base*price+quote,2)}</td></tr>`;
    return `<section class="vault-balances" aria-label="Vault balances"><div class="sidebar-card-head"><h2>Vault balances</h2><span>Sample snapshot</span></div><p>Whole vault · not your position</p><table class="vault-table"><caption class="visually-hidden">Vault allocation in WETH, USDC and total USD value</caption><thead><tr><th scope="col">Range</th><th scope="col">WETH</th><th scope="col">USDC</th><th scope="col">USD total</th></tr></thead><tbody>${rows.map(x=>row(...x)).join('')}${row('Total',totalBase,totalQuote)}</tbody></table></section>`;
  }
  const secondaryKinds={value:{label:'Position value',unit:'USD · your position'},exposure:{label:'Exposure',unit:'WETH share of position value'},fees:{label:'Fees',unit:'USD · cumulative vault fees'},pps:{label:'Price per share',unit:'USD per share · vault'}};
  function secondaryValue(kind,period) {
    if(kind==='value')return state.scenario==='disconnected'?'—':'$8,400.00';
    if(kind==='exposure')return state.scenario==='disconnected'?'—':'50.0%';
    if(kind==='pps')return '1.7154';
    return state.scenario==='history'?'Unavailable':'$'+money(period==='7D'?7400:period==='30D'?31000:92400,0);
  }
  function secondaryPlot(kind,period) {
    if(state.scenario==='history'||(state.scenario==='disconnected'&&(kind==='value'||kind==='exposure')))return `<div class="secondary-empty">${state.scenario==='disconnected'?'Connect to see your position history.':'History unavailable for this metric.'}</div>`;
    const phase=period==='7D'?0:period==='30D'?1:2;
    if(kind==='exposure') {
      const bars=Array.from({length:28},(_,i)=>{const fraction=i===27?.5:.5+Math.sin(i*.43+phase)*.12;const h=50*fraction;return `<rect class="exposure-quote" x="${i*11.35+3}" y="4" width="7" height="${50-h}"/><rect class="exposure-base" x="${i*11.35+3}" y="${54-h}" width="7" height="${h}"/>`;}).join('');
      return `<svg class="secondary-plot exposure-plot" viewBox="0 0 320 58" preserveAspectRatio="none" role="img" aria-label="${period} illustrative exposure: WETH and USDC shares of position value">${bars}</svg>`;
    }
    const series=Array.from({length:36},(_,i)=>{const t=i/35;return kind==='fees'?Math.pow(t,1.13):kind==='pps'?t*.7+Math.sin(t*Math.PI*3+phase)*.055*(1-t):t*.68+Math.sin(t*Math.PI*4+phase)*.09*(1-t);});
    const lo=Math.min(...series)-.05,hi=Math.max(...series)+.05;
    const path=series.map((v,i)=>(i?'L':'M')+(i/35*320).toFixed(1)+' '+(53-(v-lo)/(hi-lo)*47).toFixed(1)).join(' ');
    return `<svg class="secondary-plot" viewBox="0 0 320 58" preserveAspectRatio="none" role="img" aria-label="${period} illustrative ${secondaryKinds[kind].label.toLowerCase()}, ${secondaryKinds[kind].unit}"><path class="secondary-grid" d="M0 17H320M0 40H320"/><path class="secondary-fill" d="${path}L320 58H0Z"/><path class="secondary-line" d="${path}"/></svg>`;
  }
  function secondaryPanel(id,kinds) {
    const kind=kinds[0],period='7D';
    return `<section class="secondary-panel" data-secondary-panel="${id}" data-secondary-kind="${kind}" data-secondary-period="${period}"><header><div class="secondary-tabs" role="group" aria-label="${id==='position'?'Position chart metric':'Vault chart metric'}">${kinds.map((k,i)=>`<button type="button" data-action="secondary-series" data-series="${k}" aria-pressed="${!i}">${secondaryKinds[k].label}</button>`).join('')}</div><strong data-secondary-value>${secondaryValue(kind,period)}</strong></header><div class="secondary-caption"><span data-secondary-unit>${secondaryKinds[kind].unit}</span><span data-secondary-period>${period} · demo</span></div><div data-secondary-chart>${secondaryPlot(kind,period)}</div><div class="secondary-axis"><span data-secondary-start>13 Oct</span><span data-exposure-legend ${kind==='exposure'?'':'hidden'}><i></i>WETH <i class="quote-key"></i>USDC</span><span>20 Oct</span></div></section>`;
  }
  const secondaryCharts=()=>`<div class="secondary-charts" aria-label="Secondary charts">${secondaryPanel('position',['value','exposure'])}${secondaryPanel('vault',['fees','pps'])}</div>`;
  function updateSecondary(panel,kind=panel.dataset.secondaryKind,period=panel.dataset.secondaryPeriod) {
    panel.dataset.secondaryKind=kind;panel.dataset.secondaryPeriod=period;
    panel.querySelectorAll('[data-action="secondary-series"]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.series===kind));
    panel.querySelector('[data-secondary-value]').textContent=secondaryValue(kind,period);
    panel.querySelector('[data-secondary-unit]').textContent=secondaryKinds[kind].unit;
    panel.querySelector('[data-secondary-period]').textContent=period+' · demo';
    panel.querySelector('[data-secondary-start]').textContent=period==='7D'?'13 Oct':period==='30D'?'20 Sep':'20 Jul';
    panel.querySelector('[data-exposure-legend]').hidden=kind!=='exposure';
    panel.querySelector('[data-secondary-chart]').innerHTML=secondaryPlot(kind,period);
  }
  function workspace() {
    return `${alert()}<div class="workspace-grid"><section class="workspace-primary"><div class="tabs" role="tablist" aria-label="Desktop pool view">${['Price','Liquidity','Performance'].map((x,i)=>`<button type="button" role="tab" data-action="desktop-tab" data-tab="${x}" aria-selected="${!i}">${x}</button>`).join('')}</div><div data-workspace-chart>${chartPanel()}</div>${secondaryCharts()}${source()}</section><aside class="workspace-sidebar">${yourPosition(true)}${permission()}${positionTable()}<details class="allocation-panel allocation-disclosure"><summary>Strategy allocation <span>Ranges &amp; rebalance</span></summary>${ranges()}<p class="sidebar-rebalance">Last sample rebalance · 2h ago</p></details></aside></div>`;
  }
  const slider = (name,label,min,max,value,suffix='') => `<label class="slider-label" for="${current||'compare'}-${name}"><span>${label}</span><output data-output="${name}">${value}${suffix}</output></label><input id="${current||'compare'}-${name}" type="range" min="${min}" max="${max}" value="${value}" data-config-input="${name}" data-suffix="${suffix}" aria-label="${label}">`;
  function config() {
    const readonly = state.scenario==='holder'||state.scenario==='disconnected';
    return `<div class="desktop-title"><div><h1>Strategy settings</h1><p>Saved configuration · v7</p></div><span class="pill">${readonly?'Read-only settings':'Manager role · off-chain config'}</span></div>${alert()}${readonly?'<div class="permission-note"><strong>Read-only.</strong> Manager permission is required to save this configuration. Holder withdrawal is still available.</div>':''}<div class="config-grid" data-config data-readonly="${readonly}"><form class="config-form" onsubmit="return false"><fieldset class="config-group" ${readonly?'disabled':''}><div class="config-group-header"><h2>Anchor</h2><span>01</span></div><label class="lbl">Reference pool<select class="field" data-config-select="anchor"><option>This pool · WETH / USDC</option><option>UniV3 · WETH / USDC · 0.30%</option></select></label><div class="config-inline"><label class="lbl">Interval<select class="field" data-config-select="interval"><option>1 hour</option><option>4 hours</option><option>1 day</option></select></label><label class="lbl">Day / hour EMA<input class="field" value="20 / 20" aria-label="Day and hour EMA" readonly></label></div></fieldset><fieldset class="config-group" ${readonly?'disabled':''}><div class="config-group-header"><h2>Range</h2><span>02</span></div>${slider('base','Base ATR',1,15,5,'×')}${slider('limit','Limit ATR',1,15,3,'×')}${slider('chase','Chase',0,100,67,'%')}<div class="seg" role="group" aria-label="Range offset">${['Base','Limit','Both'].map((x,i)=>`<button type="button" data-action="offset" aria-pressed="${!i}" ${readonly?'disabled':''}>${x}</button>`).join('')}</div></fieldset><fieldset class="config-group" ${readonly?'disabled':''}><div class="config-group-header"><h2>Weight</h2><span>03</span></div><div class="weight-split"><div><span class="small muted">Base allocation</span><b data-base-weight>80%</b></div><div style="text-align:right"><span class="small muted">Limit allocation</span><b data-limit-weight>20%</b></div></div>${slider('weight','Base / limit weight',0,100,80,'%')}<p class="small muted" style="margin-top:10px">One slider, two complementary weights.</p></fieldset><fieldset class="config-group" ${readonly?'disabled':''}><div class="config-group-header"><h2>Exposure</h2><span>04</span></div>${slider('target','Target base ratio',0,100,50,'%')}${slider('tolerance','Tolerance',0,50,30,'%')}<label class="check">Slippage control <span class="pill">Required · on</span></label><label class="check">Keeper strategy enabled <input type="checkbox" checked data-config-enabled aria-label="Keeper strategy enabled"></label></fieldset><details><summary>Advanced · execution &amp; metadata</summary><p>Version 7 · sample config 0x51c3…77ab · signer 0x5610…283e.<br>Execution limits must come from the selected deployment. This preview does not change contract permissions or limits.</p></details><div class="config-actions"><small data-config-dirty>Saved v7 · no unsaved changes<br>Saving config does not execute an allocation.</small><div class="row">${action('Preview ranges','config-preview','ghost')}${readonly?action('Manager access required','config-review','','data-p disabled'):primary('Review changes','config-review')}</div></div></form><aside><section class="config-sidebar"><h2>Allocation preview</h2><p>Illustrative bands for this design study. A real engine preview is required before execution.</p><div data-config-chart>${lineChart('price')}</div><div data-config-ranges>${ranges()}</div>${reviewLines([['Base / limit','<span data-preview-weight>80% / 20%</span>'],['Next action','Save configuration'],['Keeper pickup','At its next decision']])}<div class="config-save-state" role="status" data-config-state></div></section><div class="permission-note"><strong>Observe → preview → review.</strong><br>A configuration save and an on-chain allocation are separate actions.</div></aside></div>`;
  }
  function desktop(t,id) {
    return `<section class="app-screen desktop skin" data-theme="${t.id}" data-layout="${t.layout}" data-dark="${['terminal','night','quant'].includes(t.layout)}" data-frame="${id}" aria-label="${screenNames[id]} desktop design preview">${desktopTop(id==='d02')}${id==='d01'?`<header class="pool-summary">${poolMetrics(true)}</header>`:''}<div class="desktop-body">${rail(id==='d02')}<main class="desktop-content">${id==='d01'?workspace():config()}</main></div></section>`;
  }
  function mobileFigure(t,id) {
    const label = id==='m05'?`<div class="caption-switch" role="group" aria-label="Withdrawal example state">${[['instant','Instant'],['queued','Queued'],['claimable','Claimable']].map(([v,label])=>`<button type="button" data-action="redeem-mode" data-mode="${v}" aria-pressed="${state.redeemMode===v}">${label}</button>`).join('')}</div>`:`<small>${id==='m02'?'Public market view':id==='m04'?'User role':'Holder view'}</small>`;
    return `<article class="screen-card" id="${id}"><header class="screen-caption"><span><code>${id.toUpperCase()}</code>${screenNames[id]}</span>${label}</header>${mobile(t,id)}</article>`;
  }
  function studyCard(t) {
    return `<article class="study" data-collection="${Number(t.id.slice(0,2))>10?'new':'original'}" style="--study-bg:${t.colors[0]};--study-ink:${t.colors[2]};--study-display:${esc(t.display)}"><div class="study-preview"><a class="study-open-overlay" href="${t.id}.html?collection=${state.collection}" aria-label="Open ${esc(t.name)} study"></a><div class="study-intro"><div class="study-number">DIRECTION ${t.id.slice(0,2)} / ${themes.length}</div><h3>${t.name}</h3><p>${t.line}</p><div class="swatches" aria-label="Palette">${[t.colors[1],t.colors[2],t.colors[4],t.colors[6]].map(c=>`<i style="background:${c}"></i>`).join('')}</div></div><div class="mini" aria-hidden="true" inert>${mobile(t,'m01',true)}</div></div><div class="study-footer"><div>${t.rank<=3?'<div class="shortlist">EDITORIAL SHORTLIST</div>':''}<div class="study-type">${t.type}</div><a href="${t.id}.html?collection=${state.collection}">Open 7-screen study <span>↗</span></a></div><label class="check"><input type="checkbox" aria-label="Compare ${esc(t.name)}" data-shortlist="${t.id}" ${state.selected.has(t.id)?'checked':''}>Compare</label></div><details><summary>Read the generation brief</summary><pre>${esc(t.brief+'\n\n'+master)}</pre><button type="button" class="studio-button" data-action="copy-prompt" data-theme-id="${t.id}">Copy complete prompt</button></details></article>`;
  }
  function screenPlan() {
    const copy = [ ['m01','Daily check-in','What do I own, how has it changed, and what needs attention?'],['m02','Find a pool','Compare pairs, venues, liquidity and time-qualified estimates.'],['m03','Understand exposure','Inspect price, allocation, your position and the exit model.'],['m04','Add liquidity','Check token spend, approvals, minimum shares and deadline.'],['m05','Exit clearly','Review tokens returned; distinguish immediate and queued exits.'],['d01','Inspect in context','A wide chart and holdings table beside the personal position.'],['d02','Manage with intent','Group settings, preview ranges, review the change before saving.'] ];
    return `<section id="screen-plan"><div class="section-heading"><h2>Seven screens that matter.</h2><p>Same tasks and data.<br>A fair visual comparison.</p></div><div class="screen-plan">${copy.map(([id,label,text])=>`<div><code>${id.toUpperCase()} / ${screenNames[id]}</code><h3>${label}</h3><p>${text}</p></div>`).join('')}</div></section>`;
  }
  function gallery() {
    return `<header class="studio-nav"><a class="studio-brand" href="index.html">${symbol}pairs.pro <small>Design studies / 2026</small></a><nav class="studio-links"><a class="studio-switch" href="../pairs-pro-tui-studies/">TUI studio ↗</a><a href="#screen-plan">Screen plan</a><a href="CHALLENGE.md" download>Join the challenge</a><button type="button" data-action="review" class="studio-button">Read design review</button><span class="studio-pill">μi / one shared framework</span></nav></header><main class="studio-main"><section class="studio-hero"><div><div class="studio-kicker">A sharper view of liquidity</div><h1>Twenty directions.<br>One <em>clearer product.</em></h1><div class="studio-stats"><span><b>05</b> mobile screens</span><span><b>02</b> desktop screens</span><span><b>${themes.length}</b> complete studies</span></div></div><div><p>Less dashboard noise. More clarity about your money, your exposure and your next action. Twenty visual directions for the same Pairs Pro experience.</p><div class="studio-actions"><button type="button" data-action="compare" class="studio-button filled">Compare shortlist ${icon('arrow')}</button><a class="studio-button" href="01-ledger.html">Start with Quiet Ledger</a></div></div></section><div class="section-heading"><h2>Pick a point of view.</h2><p>Choose up to three across either set.<br>Shortlist is a design judgment, not user testing.</p></div><div class="studio-collectionbar"><div class="collection-filter" role="group" aria-label="Study collection">${[['all','All 20'],['original','Original 10'],['new','New 10']].map(([key,label])=>`<button type="button" class="studio-button" data-action="collection-filter" data-collection="${key}" aria-pressed="${key===state.collection}">${label}</button>`).join('')}</div><div class="selection-controls"><button type="button" class="studio-button" data-action="clear-selection">Clear</button><button type="button" class="studio-button filled" data-action="compare">Compare selected · <span data-compare-count>${state.selected.size}</span>/3</button></div></div><p class="collection-status" data-collection-status></p><section class="studies">${themes.map(studyCard).join('')}</section>${screenPlan()}<footer class="studio-footer"><span>Pairs Pro · visual design exploration · updated 22 October 2026</span><span>Illustrative data · no wallets · no external assets · <a href="prompts.json">Prompt collection ↗</a> · <a href="CHALLENGE.md" download>Agent challenge brief ↗</a></span></footer></main>`;
  }
  function variant() {
    const t=themes.find(x=>x.id===current);
    const visibleMobile = ['m01','m02','m03','m04','m05'].filter(x=>state.focus==='board'||state.focus===x);
    const visibleDesktop = ['d01','d02'].filter(x=>state.focus==='board'||state.focus===x);
    return `<header class="studio-nav"><a class="studio-brand" href="index.html">${symbol}pairs.pro <small>Design studies</small></a><nav class="studio-links"><a href="index.html?collection=${state.collection}">← All ${themes.length} directions</a><button type="button" class="studio-button" data-action="print">Print study</button></nav></header><main class="studio-main ${state.focus!=='board'?'focus-mode':''}"><section class="variant-top"><div class="variant-title" style="--study-display:${esc(t.display)}"><div class="studio-kicker">${t.id.slice(0,2)} / ${t.type}</div><h1>${t.name}</h1><p>${t.line} ${t.fit}</p></div><div class="variant-controls"><label class="studio-kicker" for="phone-width">Phone canvas</label><select id="phone-width" data-phone-width><option value="390" ${state.phoneWidth===390?'selected':''}>390 px</option><option value="360" ${state.phoneWidth===360?'selected':''}>360 px</option></select><label class="studio-kicker" for="scenario">Preview state</label><select id="scenario" data-scenario>${[['normal','Normal · user + manager previews'],['holder','Holder only · deposit restricted'],['history','History unavailable · RPC quote available'],['wrong-network','Wrong network'],['disconnected','Wallet disconnected']].map(([v,label])=>`<option value="${v}" ${state.scenario===v?'selected':''}>${label}</option>`).join('')}</select><button type="button" class="studio-button" data-action="brief">Read design brief</button></div></section><div class="variant-rationale"><span><strong>Visual thesis</strong> ${t.traits.join(' · ')}</span><span><strong>One framework</strong> μi components · self-contained HTML · demo interactions</span></div><nav class="variant-tabs" aria-label="Choose a screen"><button type="button" data-action="focus-screen" data-target="board" aria-pressed="${state.focus==='board'}">Full board</button>${Object.entries(screenNames).map(([id,label])=>`<button type="button" data-action="focus-screen" data-target="${id}" aria-pressed="${state.focus===id}">${id.toUpperCase()} · ${label}</button>`).join('')}</nav>${visibleMobile.length?`<section class="phone-grid" aria-label="Five mobile screens">${visibleMobile.map(id=>mobileFigure(t,id)).join('')}</section>${state.focus==='board'?`<p class="board-note">Scroll horizontally through all five phones. Each is a ${state.phoneWidth} × 844 canvas with independently scrollable content. Use the screen tabs for a focused view.</p>`:''}`:''}${visibleDesktop.length?`<section class="desktop-group" aria-label="Two desktop screens">${visibleDesktop.map(id=>`<article id="${id}"><header class="screen-caption desktop-caption"><span><code>${id.toUpperCase()}</code>${screenNames[id]}</span><small>1440 × 900 · ${id==='d02'?'Manager role preview':'Connected holder'}</small></header><div class="desktop-wrap">${desktop(t,id)}</div></article>`).join('')}</section>`:''}<footer class="studio-footer"><span>All figures are illustrative. No real account, wallet or network is connected.</span><span>Price/tick toggles · chart controls · review flows · role states · configuration preview</span></footer></main>`;
  }
  function updateCollection() {
    const cards=[...document.querySelectorAll('.study')];cards.forEach(card=>{card.hidden=state.collection!=='all'&&card.dataset.collection!==state.collection;card.querySelectorAll('.study-open-overlay,.study-footer a').forEach(a=>{const u=new URL(a.href);u.searchParams.set('collection',state.collection);a.href=u.href;});});
    document.querySelectorAll('[data-action="collection-filter"]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.collection===state.collection));
    const count=document.querySelector('[data-collection-status]');if(count)count.textContent=`Showing ${cards.filter(c=>!c.hidden).length} of ${themes.length} studies · ${state.selected.size} selected across all sets`;
    document.querySelectorAll('[data-compare-count]').forEach(n=>n.textContent=state.selected.size);document.querySelectorAll('[data-action="compare"]').forEach(b=>b.disabled=state.selected.size<2);document.querySelectorAll('[data-action="clear-selection"]').forEach(b=>b.disabled=!state.selected.size);
  }
  function mount() {
    document.getElementById('root').innerHTML=current?variant():gallery();
    document.documentElement.style.setProperty('--phone-width', state.phoneWidth+'px');
    // Config range inputs use wrapped labels in duplicated previews; explicit ids only on D02.
    document.querySelectorAll('[data-frame="m04"]').forEach(updateDeposit);
    document.querySelectorAll('[data-frame="m05"]').forEach(updateRedeem);if(!current)updateCollection();
  }
  function toast(text) {
    const n=document.getElementById('toast');n.textContent=text;n.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>n.hidden=true,3500);
  }
  function dialog(titleText,html,label='',callback=null,cls='') {
    const d=document.getElementById('dialog');if(d.open)d.close();
    d.className='studio-dialog '+cls;d.innerHTML=`<div class="dialog-head"><h2>${titleText}</h2><button type="button" class="dialog-close" data-action="close-dialog" aria-label="Close dialog">×</button></div><div class="dialog-copy">${html}</div><div class="dialog-actions"><button type="button" class="studio-button" data-action="close-dialog">${label?'Back':'Close'}</button>${label?`<button type="button" class="studio-button filled" data-action="confirm">${label}</button>`:''}</div>`;confirmAction=callback;d.showModal();
  }
  function numeric(input) {
    const str=String(input.value).replace(/,/g,'').trim();return /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(str)?Number(str):NaN;
  }
  function updateDeposit(frame) {
    const base=numeric(frame.querySelector('[data-amount="WETH"]'));
    const quote=numeric(frame.querySelector('[data-amount="USDC"]'));
    const total=base*price+quote;
    const invalid=!Number.isFinite(total)||base<0||quote<0||total<=0||base>3.1402||quote>12480.22;
    const error=frame.querySelector('[data-deposit-error]');error.textContent=invalid?'Enter amounts within your sample token balances.':'';
    frame.querySelector('[data-deposit-value]').textContent=invalid?'—':'$'+money(total);
    frame.querySelector('[data-deposit-shares]').textContent=invalid?'—':money(total/pps);
    frame.querySelector('[data-deposit-min]').textContent=invalid?'—':money(total/pps*.995);
    for(const token of ['WETH','USDC']) frame.querySelector(`[data-amount-usd="${token}"]`).textContent=Number.isFinite(token==='WETH'?base:quote)?'$'+money(token==='WETH'?base*price:quote):'—';
    const cta=frame.querySelector('[data-action="deposit-review"]');if(cta)cta.disabled=invalid||state.scenario==='holder';
    return invalid?null:{base,quote,total,shares:total/pps,min:total/pps*.995};
  }
  function updateRedeem(frame) {
    const shares=numeric(frame.querySelector('[data-redeem-shares]'));
    const invalid=!Number.isFinite(shares)||shares<=0||shares>redeemBalance;
    const ratio=shares/poolShares;
    frame.querySelector('[data-redeem-error]').textContent=invalid?'Enter shares within your available sample balance.':'';
    frame.querySelector('[data-redeem-percent]').textContent=invalid?'Invalid amount':fmt(ratio*100,1)+'% of your position';
    frame.querySelector('[data-redeem-usd]').textContent=invalid?'—':'$'+money(ownValue*ratio);
    frame.querySelector('[data-receive-base]').textContent=invalid?'—':fmt(fullBase*ratio,4);
    frame.querySelector('[data-receive-quote]').textContent=invalid?'—':money(fullQuote*ratio);
    frame.querySelector('[data-receive-min]').textContent=invalid?'Minimums unavailable':`Minimum ${fmt(fullBase*ratio*.995,4)} WETH + ${money(fullQuote*ratio*.995)} USDC`;
    const cta=frame.querySelector('[data-action="redeem-review"]');if(cta)cta.disabled=invalid||state.redeemMode==='queued';
    return invalid?null:{shares,base:fullBase*ratio,quote:fullQuote*ratio};
  }
  function filterPools(frame) {
    const query=frame.querySelector('[data-pool-search]').value.trim().toLowerCase();
    const selected=frame.querySelector('[data-pool-dex]').value;
    const network=frame.querySelector('[data-pool-network]').value;
    let count=0;
    frame.querySelectorAll('[data-pool-list] .pool-card').forEach(row=>{const show=(selected==='All'||row.dataset.dex===selected)&&(network==='All'||row.dataset.network===network)&&row.dataset.search.toLowerCase().includes(query);row.hidden=!show;if(show)count++;});
    frame.querySelector('[data-pool-count]').textContent=count+' pool'+(count===1?'':'s');frame.querySelector('[data-no-pools]').hidden=count!==0;
  }
  function navigate(id) {
    if(!current){location.href=themes[0].id+'.html#'+id;return;}
    state.focus=id;history.replaceState(null,'','#'+id);mount();window.scrollTo({top:0,behavior:'instant'});
  }
  function updateChart(panel) {
    const mode=panel.querySelector('[data-chart-type]').value;
    const period=panel.querySelector('[data-action="price-period"][aria-pressed="true"]').dataset.period;
    const host=panel.querySelector('[data-price-chart]');host.innerHTML=priceChart(mode,period);
    panel.querySelector('.chart-axis span').textContent=period==='7D'?'13 Oct':period==='30D'?'20 Sep':'20 Jul';
    host.querySelector('.chart-bands').style.display=panel.querySelector('[data-chart-bands]').checked?'':'none';
    panel.closest('[data-frame]').querySelectorAll('[data-secondary-panel]').forEach(p=>updateSecondary(p,p.dataset.secondaryKind,period));
    panel.querySelector('[data-chart-readout]').textContent=`${mode} · ${period} illustrative series · not a live quote.`;
  }
  function updateConfig(root) {
    const values={};root.querySelectorAll('[data-config-input]').forEach(input=>{values[input.dataset.configInput]=Number(input.value);root.querySelector(`[data-output="${input.dataset.configInput}"]`).textContent=input.value+input.dataset.suffix;});
    root.querySelector('[data-base-weight]').textContent=values.weight+'%';root.querySelector('[data-limit-weight]').textContent=(100-values.weight)+'%';root.querySelector('[data-preview-weight]').textContent=values.weight+'% / '+(100-values.weight)+'%';
    root.querySelector('[data-range-base-weight]').textContent=values.weight+'%';root.querySelector('[data-range-limit-weight]').textContent=(100-values.weight)+'%';
    root.querySelector('[data-config-dirty]').innerHTML='Unsaved changes · preview before review<br>Saving config does not execute an allocation.';
    root.querySelector('[data-config-state]').textContent='';return values;
  }
  const reviewHtml = `<p>The existing wireframe is a strong functional inventory, but weak visual prioritization makes it feel more technical than it needs to.</p><div class="review-list"><div><h3>01 · Put the holder before the protocol.</h3><p>Lead with the user's position, return period and next action. Pool TVL, contract addresses and global reserves belong beneath that first reading.</p></div><div><h3>02 · Give data a hierarchy.</h3><p>The current sheet gives metric boxes, labels, metadata and controls almost equal weight. Use a dominant figure, a restrained second tier, and a single accessible source disclosure.</p></div><div><h3>03 · Separate inspect from act.</h3><p>Keep charts and ranges visible to guests. Put deposit and withdrawal in focused flows; put manager configuration in its own workspace.</p></div><div><h3>04 · Make the seven screens one journey.</h3><p>A sheet with 24 role frames is good for specification review. These studies use five mobile tasks and two desktop workspaces to evaluate a coherent product instead.</p></div><div><h3>05 · Stay precise without looking clinical.</h3><p>Price and tick units, projected bands, role limits, minimum outputs and queue states stay explicit. Typography, spacing and grouping do the visual work; nothing relies on a decorative gradient.</p></div></div><p>Shortlist: <strong>Quiet Ledger</strong> for overall balance, <strong>Orchard</strong> for approachability, <strong>Index</strong> for sharp minimalism. These are editorial judgments, not usability-test results.</p>`;
  function showComparison() {
    if(!state.selected.size){toast('Select one to three directions to compare.');return;}
    const cols=themes.filter(t=>state.selected.has(t.id)).map(t=>`<div class="compare-column"><h3>${t.id.slice(0,2)} · ${t.name}</h3>${mobile(t,state.compareScreen)}</div>`).join('');
    dialog('Compare the same task',`<div class="compare-toolbar"><p>Same data, framework and action.<br>Compare hierarchy, type and visual load.</p><select aria-label="Comparison screen" data-comparison-screen>${Object.entries(screenNames).filter(([id])=>id.startsWith('m')).map(([id,name])=>`<option value="${id}" ${id===state.compareScreen?'selected':''}>${id.toUpperCase()} · ${name}</option>`).join('')}</select></div><div class="compare-grid">${cols}</div>`,'',null,'compare-dialog');
    document.querySelectorAll('#dialog [data-frame="m04"]').forEach(updateDeposit);document.querySelectorAll('#dialog [data-frame="m05"]').forEach(updateRedeem);
  }
  document.addEventListener('click',event=>{
    const b=event.target.closest('[data-action]');if(!b||b.disabled)return;
    const a=b.dataset.action,frame=b.closest('[data-frame]');
    if(a==='collection-filter'){state.collection=b.dataset.collection;history.replaceState(null,'','?collection='+state.collection);updateCollection();return;}
    if(a==='clear-selection'){state.selected.clear();document.querySelectorAll('[data-shortlist]').forEach(n=>n.checked=false);updateCollection();return;}
    if(a==='close-dialog'){document.getElementById('dialog').close();return;}
    if(a==='confirm'){document.getElementById('dialog').close();if(confirmAction)confirmAction();return;}
    if(a==='print'){window.print();return;}
    if(a==='review'){dialog('A clearer product, not just a new skin.',reviewHtml,'',null,'review-dialog');return;}
    if(a==='brief'){const t=themes.find(x=>x.id===current);dialog(t.name+' · design brief',`<p>${esc(t.brief)}</p><p class="disclaimer">One shared μi layer. Seven fixed tasks. All figures and flows are illustrative. Theme changes typography, structure, density and emphasis as well as color.</p>`);return;}
    if(a==='copy-prompt'){const t=themes.find(x=>x.id===b.dataset.themeId);const text=t.brief+'\n\n'+master;if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text).then(()=>toast('Complete prompt copied.')).catch(()=>dialog('Copy the complete prompt',`<textarea class="field" rows="12" aria-label="Complete generation prompt">${esc(text)}</textarea>`));else dialog('Copy the complete prompt',`<textarea class="field" rows="12" aria-label="Complete generation prompt">${esc(text)}</textarea>`);return;}
    if(a==='compare'){showComparison();return;}
    if(a==='focus-screen'){state.focus=b.dataset.target;history.replaceState(null,'',state.focus==='board'?'#board':'#'+state.focus);mount();return;}
    if(a==='go-screen'){navigate(b.dataset.target);return;}
    if(a==='pool-example'){dialog(esc(b.dataset.pair||'Pool example'),'<p>This card is included to compare the pool-list design. The complete seven-screen journey uses WETH / USDC on VeloV3 so that every direction shares the same data.</p>','Open WETH / USDC sample',()=>navigate('m03'));return;}
    if(a==='go-pools'){navigate('m02');return;}if(a==='go-pool'){navigate('m03');return;}if(a==='go-deposit'){navigate('m04');return;}if(a==='go-redeem'){navigate('m05');return;}
    if(a==='connect'||a==='wallet'){dialog('Wallet preview',`<p>${a==='connect'?'A real app would open the wallet connection flow.':'Sample wallet: 0x5610…283e. Roles are read separately from share ownership.'}</p><p class="disclaimer">This local prototype never connects a wallet, reads an account or requests a signature.</p>`);return;}
    if(a==='switch-network'){dialog('Switch network preview','<p>The wallet is shown on Ethereum while this example pool is on Base. The real app must confirm a successful network switch before enabling transaction review.</p><p class="disclaimer">No network request is made in this prototype.</p>');return;}
    if(a==='activity'){dialog('Sample activity','<dl><dt>Deposit · 18 Oct</dt><dd>0.5 WETH + 1,215.75 USDC</dd><dt>Config update · 19 Oct</dt><dd>Manager · v7</dd><dt>Withdrawal request</dt><dd>No pending Base request</dd></dl><p class="disclaimer">Illustrative activity only. No real transactions or hashes are represented.</p>');return;}
    if(a==='secondary-series'){updateSecondary(b.closest('[data-secondary-panel]'),b.dataset.series);return;}
    if(a==='range-units'){const root=b.closest('[data-ranges]');const ticks=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',ticks);root.querySelectorAll('[data-price]').forEach(x=>x.textContent=ticks?x.dataset.ticks:x.dataset.price);root.querySelector('[data-range-units]').textContent=ticks?'Tick indices':'Prices in USDC per WETH';return;}
    if(a==='equity-period'){b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));const root=b.closest('[data-equity]');root.querySelector('[data-equity-chart]').innerHTML=lineChart('equity',120,b.dataset.period);root.querySelector('[data-equity-period-label]').textContent=b.dataset.period+' illustrative series';return;}
    if(a==='price-period'){b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));updateChart(b.closest('[data-price-panel]'));return;}
    if(a==='max-amount'){frame.querySelector(`[data-amount="${b.dataset.token}"]`).value=b.dataset.max;updateDeposit(frame);return;}
    if(a==='redeem-percent'){frame.querySelector('[data-redeem-shares]').value=money(redeemBalance*Number(b.dataset.percent)/100,4);b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));updateRedeem(frame);return;}
    if(a==='redeem-mode'){state.redeemMode=b.dataset.mode;mount();return;}
    if(a==='deposit-review'){const v=updateDeposit(frame);if(!v)return;dialog('Review deposit',`<p>WETH / USDC · VeloV3 · Base</p><dl><dt>Exact WETH approval</dt><dd>${fmt(v.base,6)} WETH</dd><dt>Exact USDC approval</dt><dd>${money(v.quote)} USDC</dd><dt>Estimated shares</dt><dd>${money(v.shares,4)}</dd><dt>Minimum shares</dt><dd>${money(v.min)}</dd><dt>Deadline / fee</dt><dd>10 min / $0.42 est.</dd></dl><p class="disclaimer">Demo review only. No approval, signature or transaction will be requested.</p>`,'Finish preview',()=>toast('Deposit preview complete. No transaction was sent.'));return;}
    if(a==='redeem-review'||a==='claim-review'){const v=updateRedeem(frame);if(!v)return;dialog(a==='claim-review'?'Review settled claim':'Review withdrawal',`<p>${a==='claim-review'?'AeroCL2 · Arc · settled sample request':'VeloV3 · Base · immediate exit'}</p><dl><dt>Shares</dt><dd>${money(v.shares,4)}</dd><dt>Estimated WETH</dt><dd>${fmt(v.base,6)}</dd><dt>Estimated USDC</dt><dd>${money(v.quote)}</dd><dt>Minimum WETH / USDC</dt><dd>${fmt(v.base*.995,6)} / ${money(v.quote*.995)}</dd><dt>Deadline</dt><dd>10 minutes</dd></dl><p class="disclaimer">Demo review only. No transaction or claim will be sent.</p>`,'Finish preview',()=>toast('Withdrawal preview complete. No transaction was sent.'));return;}
    if(a==='offset'){b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));updateConfig(b.closest('[data-config]'));return;}
    if(a==='config-preview'){const root=b.closest('[data-config]');const v=updateConfig(root);root.querySelector('[data-config-state]').textContent=`Preview refreshed · base ${v.base}× ATR, limit ${v.limit}× ATR, weights ${v.weight}% / ${100-v.weight}%. Illustrative only; no engine call.`;root.querySelector('[data-config-chart]').innerHTML=lineChart('price',120,v.base>7?'All':'7D');return;}
    if(a==='config-review'){const root=b.closest('[data-config]');if(root.dataset.readonly==='true')return;const v=updateConfig(root);const enabled=root.querySelector('[data-config-enabled]').checked;const offset=root.querySelector('[data-action="offset"][aria-pressed="true"]').textContent;dialog('Review configuration',`<p>WETH / USDC · Base · manager preview</p><dl><dt>Base ATR</dt><dd>${configDefaults.base}× → ${v.base}×</dd><dt>Limit ATR</dt><dd>${configDefaults.limit}× → ${v.limit}×</dd><dt>Base / limit weight</dt><dd>${v.weight}% / ${100-v.weight}%</dd><dt>Target / tolerance</dt><dd>${v.target}% / ±${v.tolerance}%</dd><dt>Offset / enabled</dt><dd>${offset} / ${enabled?'Yes':'No'}</dd></dl><p class="disclaimer">Saving a real config would request a signature and wait for keeper pickup. This preview stores nothing remotely and does not allocate liquidity.</p>`,'Simulate save',()=>{root.querySelector('[data-config-state]').textContent='Demo config saved · waiting for keeper pickup. No signature, remote write or allocation was performed.';root.querySelector('[data-config-dirty]').textContent='Demo saved · keeper pickup pending';});return;}
    if(a==='desktop-tab'){const root=b.closest('[data-frame]');b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-selected',x===b));const host=root.querySelector('[data-workspace-chart]');if(b.dataset.tab==='Price')host.innerHTML=chartPanel();else if(b.dataset.tab==='Liquidity')host.innerHTML=`<div class="chart-block">${depthChart()}<div class="chart-axis"><span>2,156.6 USDC</span><span>Current · 2,431.5</span><span>2,741.5 USDC</span></div><p class="chart-readout">Illustrative active liquidity. Solid = base, outlined = limit.</p></div>`;else host.innerHTML=state.scenario==='history'?'<div class="loading-placeholder">Performance history unavailable. Your current position remains visible.</div>':`<div class="chart-block">${lineChart('equity')}<p class="chart-readout">Illustrative value series · 30 days · not a yield guarantee.</p></div>`;if(b.dataset.tab==='Price'&&state.scenario!=='history')updateChart(host.querySelector('[data-price-panel]'));return;}
  });
  function depthChart() {
    const bars=Array.from({length:40},(_,i)=>{const h=18+Math.exp(-(((i-21)/9)**2))*140;return `<rect x="${i*8+1}" y="${180-h}" width="6" height="${h}" fill="${i<18?'var(--n3)':'var(--ac)'}" opacity="${i>28?'.3':'.6'}"/>`;}).join('');
    return `<svg class="chart pool-chart" viewBox="0 0 320 190" role="img" aria-label="Illustrative liquidity depth">${bars}<line x1="163" x2="163" y1="0" y2="180" stroke="var(--fg)" stroke-width="1.5"/></svg>`;
  }
  document.addEventListener('input',event=>{
    const n=event.target;if(n.matches('[data-amount]'))updateDeposit(n.closest('[data-frame]'));
    if(n.matches('[data-redeem-shares]'))updateRedeem(n.closest('[data-frame]'));
    if(n.matches('[data-pool-search]'))filterPools(n.closest('[data-frame]'));
    if(n.matches('[data-config-input]'))updateConfig(n.closest('[data-config]'));
  });
  document.addEventListener('change',event=>{
    const n=event.target;
    if(n.matches('[data-phone-width]')){state.phoneWidth=Number(n.value);mount();}
    if(n.matches('[data-scenario]')){state.scenario=n.value;mount();}
    if(n.matches('[data-pool-dex],[data-pool-network]'))filterPools(n.closest('[data-frame]'));
    if(n.matches('[data-chart-type],[data-chart-bands]'))updateChart(n.closest('[data-price-panel]'));
    if(n.matches('[data-config-select],[data-config-enabled]'))updateConfig(n.closest('[data-config]'));
    if(n.matches('[data-shortlist]')){if(n.checked&&state.selected.size===3){n.checked=false;toast('Compare up to three directions. Uncheck one first.');return;}n.checked?state.selected.add(n.dataset.shortlist):state.selected.delete(n.dataset.shortlist);updateCollection();}
    if(n.matches('[data-comparison-screen]')){state.compareScreen=n.value;showComparison();}
  });
  document.addEventListener('keydown',event=>{
    const chart=event.target.closest('[data-price-chart]');if(!chart||!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();const i=Math.max(0,Math.min(33,Number(chart.dataset.cursor||16)+(event.key==='ArrowRight'?1:-1)));chart.dataset.cursor=i;
    const p=2400+Math.sin(i*.38)*30+i;chart.closest('[data-price-panel]').querySelector('[data-chart-readout]').textContent=`Sample candle ${i+1}/34 · ${money(p)} USDC · base ${i<8?'projected':'sample allocation'}.`;
  });
  document.getElementById('dialog').addEventListener('click',event=>{if(event.target.id!=='dialog')return;const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();});
  window.addEventListener('hashchange',()=>{if(!current)return;state.focus=/^#(m0[1-5]|d0[12])$/.test(location.hash)?location.hash.slice(1):'board';mount();});
  if(current && /^#(m0[1-5]|d0[12])$/.test(location.hash))state.focus=location.hash.slice(1);
  mount();
})();
