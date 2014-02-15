scrymg
======

A new dimension in content sharing


# Server API

### `/scrymg/story/publish/:title/:content`

Publishes a story. The "type" of story (image, text, video, audio, etc.) will be determined by the server and utilized when a collection of stories are returned to the client by letting the client know how to render them. The server guesses the type based on the content field - if it's some kind of URI ending with .jpg, it'll assign it as an image type, etc.

Returns JSON like `{"success":true}`

### `/scrymg/story/get/:count/:since`

Gets up to `count` stories after `since` (Unix time), sorted by time (so closest to now, back until `since`).

Returns JSON like `{"stories":[{"_id":"1234567890ab", "time":123456789,"user":"Anonymous", "rating":45,"type":"image","title":"test post","content":"http://example.com"},...]}`

### `/scrymg/story/vote/:id/:amount`

Votes up/down a story.

Returns JSON like `{"success":true}`
