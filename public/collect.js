(async function(){
  try {
    await fetch('/collect-ip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: location.href }),
      credentials: 'same-origin'
    });
  } catch (e) {
    console.error('IP collect failed', e);
  }
})();
