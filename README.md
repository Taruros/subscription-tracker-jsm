# Subscription Tracker by Taruros

## This is my version of the JSM Subscription tracker API

I've been learning and developing it for almost a month before the first commit. I'm not sure why I didn't make a github repo for it earlier, even a private one. Anyway, I would say the skill and knowledge is more important than green dots on my profile (althought I could use them too) I might add some more improvements after finishing the video.

### Notable changes:

- Password hashing logic moved to an on-save pre function (better for password updates)

- Added a /users/me route so there is no need to provide the ID inside the url. Instead, the user ID is determined from the bearer token (the logic behind this change is simple - if you put another user's ID in the URL, you can't access it, so there's no reason to make a route for it)

- No Arcjet (the free tier is too short)

more updates possible in the future
