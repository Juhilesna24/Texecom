# Texecom

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

## API Documentation

URL: {{host}}/api/receiveMessage
Body: {
    "device_guid": "string" // length should equal to 32,
    "path": "string" // ["ethernet", "wifi", "gsm"]
}
