const websockets = {
  clock: {
    on_open: (connection = {}) => {
      connection.send(JSON.stringify({
        timestamp: new Date().toISOString(),
        unix: Date.now()
      }));
      
      const interval = setInterval(() => {
        connection.send(JSON.stringify({
          timestamp: new Date().toISOString(),
          unix: Date.now()
        }));
      }, 1000);
      
      connection.clock_interval = interval;
    },
    on_message: (message = {}, connection = {}) => {
      console.log('message from client:', message);
    },
    on_close: (code = 0, reason = '', connection = {}) => {
      if (connection.clock_interval) {
        clearInterval(connection.clock_interval);
      }
    }
  }
};

export default websockets;
