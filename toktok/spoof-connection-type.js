// spoof-connection-type.js

(function () {
  const spoofedConnection = {
    type: 'wifi',           // bisa diganti 'cellular' / 'ethernet'
    effectiveType: '4g',    // bisa diganti '3g', '2g', 'slow-2g'
    downlink: 10,           // kecepatan Mbps
    rtt: 50,                // latency ms
    saveData: false         // hemat data
  };

  Object.defineProperty(navigator, 'connection', {
    get: function () {
      return spoofedConnection;
    }
  });

  // Jika navigator.connection sudah ada sebelumnya, timpa properti
  if (navigator.connection) {
    for (let key in spoofedConnection) {
      if (spoofedConnection.hasOwnProperty(key)) {
        try {
          Object.defineProperty(navigator.connection, key, {
            get: () => spoofedConnection[key]
          });
        } catch (e) {
          console.warn(`Failed to spoof navigator.connection.${key}:`, e);
        }
      }
    }
  }
})();
