scrymg
======

A new dimension in content sharing


# Server API

### `/scrymg/item/publish/:image/:title/:content`

Publishes a story.

Returns JSON like `{"success":true}`

### `/scrymg/item/getall`

Gets all recent stories.

Returns JSON like `[{"image":"http://example.com/jpg.jpg","title":"test post","content":"Words go here"},...]`
