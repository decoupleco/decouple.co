// An illustrative replay fixture. No simulator, production data, or engine is loaded.
export function makeFixture() {
 const rows=[]; let prev=110400;
 for(let i=0;i<96;i++) {
  const t=i/95, close=110000 + 4200*Math.sin(t*9) + 1700*Math.sin(t*32) - t*15600 + 431;
  const open=prev, high=Math.max(open,close)+400+Math.abs(Math.sin(i*5))*900, low=Math.min(open,close)-350-Math.abs(Math.cos(i*3))*850;
  const nav=100+85.94*t+9*Math.sin(t*8)*(1-t), hodl=100+50.95*t+12*Math.sin(t*7)*(1-t);
  const exposure=.51+.22*Math.sin(i/12)*(1-t*.55), idle=.1+.26*t;
  rows.push({i,time:new Date(Date.UTC(2025,10,1)+i*14400000).toISOString(),open,close,high,low,nav,hodl,hodl100:100+101.91*t,exposure,idle,fee:.15+Math.pow(Math.sin(i*1.7),8)*1.3+(i%17===0?2.3:0),rebalance:i>0&&(i%13===0||i===92),baseLow:90000+Math.floor(i/24)*230,baseHigh:123000-Math.floor(i/24)*2300,limitLow:98000-Math.floor(i/24)*760,limitHigh:117000-Math.floor(i/24)*2100});prev=close;
 }
 // Keep the supplied screenshot's end readouts; the intervening path is synthetic.
 rows[95].close=94831; rows[95].low=Math.min(rows[95].low,94200); rows[95].baseLow=90700;rows[95].baseHigh=116000;rows[95].limitLow=95700;rows[95].limitHigh=110000;
 return rows;
}
export function visibleRows(rows,cursor,span=40) {return rows.slice(Math.max(0,cursor-span+1),cursor+1)}
export function valuesAt(rows,cursor) {
 const r=rows[cursor]; return {nav:r.nav,hodl:r.hodl,gap:r.nav-r.hodl,relative:(r.nav/r.hodl-1)*100,fees:rows.slice(0,cursor+1).reduce((a,r)=>a+r.fee,0),pps:r.nav/100};
}
