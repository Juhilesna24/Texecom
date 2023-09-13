// In-Memory Storage
const devicesAndTime = {};
const pathTimers = {
  ethernet: 30,
  wifi: 45,
  gsm: 60,
};
const faultTimers = {};

function receiveMessage(req, res) {
  const { device_guid, path } = req.body;

  devicesAndTime[device_guid] = devicesAndTime[device_guid] || {};

  // Update the timestamp for the device guid and path
  devicesAndTime[device_guid][path] = Date.now();

  // Reset the timer
  resetDeviceTimer(device_guid, path);

  // Clear the fault logged flag and fault timer when message is received
  clearInterval(faultTimers[device_guid]?.[path]);

  res.sendStatus(200);
}

function resetDeviceTimer(device_guid, path) {
  // Clear previous time
  clearTimeout(devicesAndTime[device_guid]?.[path]); 

  // Set a new timer to check faults
  devicesAndTime[device_guid][path] = setTimeout(() => {
    checkDeviceTimer(device_guid, path);
  }, pathTimers[path] * 1000);
}

function checkDeviceTimer(device_guid, path) {
  const currentTime = Date.now();
  const lastMessageTime = devicesAndTime[device_guid]?.[path] || 0;
  const interval = pathTimers[path] * 1000;

  if (currentTime - lastMessageTime > interval) {
    console.log(`Device fault ${device_guid} for path ${path}`);
    startDeviceFaultTimer(device_guid, path);
  }
}

function startDeviceFaultTimer(device_guid, path) {
  // Clear any existing fault timer
  clearInterval(faultTimers[device_guid]?.[path]);

  // Initialize the device fault timers for the device
  faultTimers[device_guid] = faultTimers[device_guid] || {};

  // Set a timer to check for device faults
  faultTimers[device_guid][path] = setInterval(() => {
    console.log(`Device fault ${device_guid} for path ${path}`);
  }, pathTimers[path] * 1000);
}

module.exports = {
  receiveMessage,
};
