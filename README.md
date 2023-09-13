# **Texecom**

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

## API Documentation


**URL:** {{host}}/api/receiveMessage

**Request Body:**

`device_guid`: A string field, and its length should equal 32 characters.

`path`: A string field representing a path, which appears to have a predefined set of values: `["ethernet", "wifi", "gsm"]`.
