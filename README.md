# GitHubHooks

> A dependency-free node js package to help with GitHub webhooks | Also has really good ts support and works with [express](#express-usage) > <br />

<br />

## Installation

```
npm i githubhooks
```

<br />

## Autocompletion

Thanks to the typescript declarations and code comments, auto-completion looks something like this:

![GitHubHooks](https://user-images.githubusercontent.com/50122507/139356094-be98b545-cefa-4031-9bed-022a3eb798d5.gif)

All events are being displayed together with a description that features a table with type declarations.
As soon as you change the name of the event and hover over the "on" word the corresponding Infos are shown.
The response object (rsp) was defined as precisely as possible so you have the best possible overview.

<br />

## Usage

Besides the normal use case you can also use this package with [express](#express-usage).<br/>
You can also use the handler method as described below in the [express](#express-usage) section with nearly any other webserver package since it is just a function that requires `req` and `res` as parameters which types are `httpServer.IncomingMessage` and `httpServer.ServerResponse`

<br />

### Prerequisite

Of course, the first thing to do is to create a github webhook. To create a new webhook just navigate to the settings of your repo, click on Webhooks and Add webhook. When creating it does not matter which content type you choose. It is only important that you enter the correct payload url for your server and, if necessary, a secret that you can later put into the constructor as the webhookSecret parameter. If you want to use https (SSL) you also have to put the content of your key and cert files into the constructor. Make sure you select the events you want to have. By default, only the `push` event is selected. Your finished webhook should look like this:

![image](https://user-images.githubusercontent.com/50122507/139538042-c5c37e95-6dc2-4f7c-9705-dc5273504c28.png)

<br />


### Standart usage

```js
import { GitHubHooks } from 'githubhooks';

const GHH = new GitHubHooks();

// If you want to use a secret that you specified with the GitHub Webhook do this:
const GHH = new GitHubHooks({
  webhookSecret: '1234',
});

// If you want to use https do this:
const GHH = new GitHubHooks({
  key: 'content of key file',
  cert: 'content of cert file',
});
// Note: You need to put in the content of your key and cert file for example with fs.readFileSync and NOT the file path!

GHH.on('push', (rsp) => {
  console.log(`Got a new push from ${rsp.pusher.name}`);
});

GHH.listen(80, () => console.log('Listening...'));
```
<br />

### Express usage

<br />

A couple of things to keep in mind when using this with express:

- You have to use the handler with for example `app.use("/webhooks", GHH.handler);` before any middleware since it needs to read the raw body
- If you are not using the `app.use` function you have to use the `app.post` since all requests for GitHub webhooks are made with the `POST` method
- Note that SSL (https) won't work as before by passing the cert and key files to the constructor since the handling of the webserver is now done via express

<br />

```js
import express from 'express';
import { GitHubHooks } from 'githubhooks';

const GHH = new GitHubHooks({
  webhookSecret: '1234',
});

const app = express();

// You can use this:
app.post('/webhooks', GHH.handler);
// or that:
app.use('/webhooks', GHH.handler);

GHH.on('push', (req) => console.log(`Got new push from ${req.pusher.name}`));

app.listen(80, () => console.log('Listening...'));
```

<br />

The event names and response object parameters (rsp payload) are as descriped in the [offical documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads) with some additions form the [octokit package](https://www.npmjs.com/package/octokit).
<br />
<br />

## Buy me a coffee

I spent a lot of time on this package, especially on the typescript part. If you want to support my work, so I can keep making such cool things, you can [buy me a coffee](https://www.paypal.me/x32Vegas)

<br />

Coded with ❤️ by Max Braun
