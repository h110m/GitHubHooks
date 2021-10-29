# GitHubHooks

> A dependency-free node js package to help with github webhooks | Also has really good ts support
> <br />

<br />

## Installation

```
npm i githubhooks
```
<br />

## Autocompletion

Thanks to the typescript declarations and code comments auto completion looks something like this:

![GitHubHooks](https://user-images.githubusercontent.com/50122507/139356094-be98b545-cefa-4031-9bed-022a3eb798d5.gif)

All events are beeing dispayed together with a description that feature a table with type declarations.
As soon as you change the name of the event and hover over the "on" word the corresponding infos are shown.
The response object (rsp) was defined as precisely as possible so you have the best possible overview.

<br />

## Usage

```js
import GitHubHooks from 'githubhooks';

var ghh = new GitHubHooks();

// If you want to use a secret that you specified with the GitHub Webhook do this:
var ghh = new GitHubHooks({
  webhookSecret: '1234',
});

// If you want to use https do this:
var ghh = new GitHubHooks({
  key: 'content of key file',
  cert: 'content of cert file',
});
// Note: You need to put in the content of your key and cert file for example with fs.readFileSync and NOT the file path!

ghh.on('push', (rsp) => {
  console.log(`Got a new push from ${rsp.pusher.name}`);
});

ghh.listen(80, () => console.log('Listening...'));
```

<br />

The event names and response object parameters (rsp payload) are as descriped in the [offical documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads) with some additions form the [octokit package](https://www.npmjs.com/package/octokit).
<br />
<br />

## Buy me a coffe

I spent a lot on this package especally on the typescript part. So if you want to support my work so i can keep making such cool things you can [buy me a coffe](https://www.paypal.me/x32Vegas)

<br />

Coded with ❤️ by Max Braun
