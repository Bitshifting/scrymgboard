scrymg
======

A new dimension in content sharing


# Server API

### `/scrymg/story/publish/:type/:title/:content`

Publishes a story, where `type` is one of `{text, image, video, sound}` and `content` is of the respective form `{"blah blah blah", "http://example.com/img.jpg", "http://example.com/video.mp4", "http://example.com/sound.mp3"}`

Returns JSON like `{"success":true}`

### `/scrymg/story/get/:count`

Gets all recent stories.

Returns JSON like `[{"_id":"1234567890ab", "time":123456789,"rating":45,"type":"image","title":"test post","content":"http://example.com"},...]`

### `/scrymg/story/vote/:id/:amount`

Votes up/down a story.

Returns JSON like `{"success":true}`
