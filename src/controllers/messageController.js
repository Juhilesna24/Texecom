// In-Memory Storage
const deviceTimestamps = {};
const pathTimers = {
  ethernet: 30,
  wifi: 45,
  gsm: 60,
};
const deviceFaultTimers = {}; 
const deviceFaultLogged = {}; 

function receiveMessage(req, res) {
  const { device_guid, path } = req.body;

  deviceTimestamps[device_guid] = deviceTimestamps[device_guid] || {};

  // Update the timestamp for the device_guid and path
  deviceTimestamps[device_guid][path] = Date.now();

  // Reset the timer
  resetDeviceTimer(device_guid, path);

  // Clear the fault logged flag when a message is received
  deviceFaultLogged[device_guid] = deviceFaultLogged[device_guid] || {};
  deviceFaultLogged[device_guid][path] = false;

  res.sendStatus(200);
}

function resetDeviceTimer(device_guid, path) {
  // Clear previous time
  clearTimeout(deviceTimestamps[device_guid]?.[path]); 

  // Set a new timer to check faults
  deviceTimestamps[device_guid][path] = setTimeout(() => {
    checkDeviceTimer(device_guid, path);
  }, pathTimers[path] * 1000);
}

function checkDeviceTimer(device_guid, path) {
  const currentTime = Date.now();
  const lastMessageTime = deviceTimestamps[device_guid]?.[path] || 0;
  const interval = pathTimers[path] * 1000;

  if (!deviceFaultLogged[device_guid]?.[path] && currentTime - lastMessageTime > interval) {
    console.log(`Device fault ${device_guid} for path ${path}`);
    startDeviceFaultTimer(device_guid, path);
    // mark as true when the device fault logs initiated
    deviceFaultLogged[device_guid][path] = true;
  }
}

function startDeviceFaultTimer(device_guid, path) {
  // Clear any existing fault timer
  clearInterval(deviceFaultTimers[device_guid]?.[path]);

  // Initialize the device fault timers for the device
  deviceFaultTimers[device_guid] = deviceFaultTimers[device_guid] || {};

  // Set a timer to check for device faults
  deviceFaultTimers[device_guid][path] = setInterval(() => {
    console.log(`Device fault ${device_guid} for path ${path}`);
  }, pathTimers[path] * 1000);
}

module.exports = {
  receiveMessage,
};
