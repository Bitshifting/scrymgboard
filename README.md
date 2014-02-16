scrymg
======

A new dimension in content sharing

![http://i.imgur.com/cWLM3ma.png]

# Server API

Port 5555.

### `/scrymg/story/publish/:title/:content`

Publishes a story. The "type" of story (image, text, video, audio, etc.) will be determined by the server and utilized when a collection of stories are returned to the client by letting the client know how to render them. The server guesses the type based on the content field - if it's some kind of URI ending with .jpg, it'll assign it as an image type, etc.

Returns JSON like `{"success":true}`

### `/scrymg/story/get/:count/:since`

Gets up to `count` stories after `since` (Unix time), sorted by time descending. Initially, you should call with `0` as the `since` parameter, and then every update keep track of when you last called it and use an updated time to get only newly posted stories.

Will fetch up to 128 stories starting from time now until time `since`.

Returns JSON like `[{"_id":"1234567890ab", "time":123456789,"user":"Anonymous", "rating":45,"type":"image","title":"test post","content":"http://example.com"},...]`

### `/scrymg/story/vote/:id/:amount`

Votes up/down a story.

Returns JSON like `{"success":true}`
