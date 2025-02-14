import './components/avatar-grid';
// <avatar-grid></avatar-grid>
// import './example-order';
// import './example-order-v2';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="padding: 5rem">
  <avatar-grid></avatar-grid>
  </div>
`; 