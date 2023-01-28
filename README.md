# n8n-nodes-humhub

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

## N8N documentation on custom nodes

[N8N documentation on custom nodes](https://docs.n8n.io/nodes/creating-nodes/create-n8n-nodes-module.html)

## Try it out with docker

The recommended way is using our docker image [Digital Boss' N8N custom nodes docker image](https://hub.docker.com/r/digitalboss/n8n-custom-nodes)

## Another way to try it out

Clone the n8n-nodes-humhub repository and execute:
```
# Install dependencies
npm install

# Build the code
npm run build

# "Publish" the package locally
npm link
```

Create an N8N installation and add the n8n-nodes-humhub to it:
```
# Create an N8N installation
cd ..
mkdir n8n_install
cd n8n_install
npm init
npm install
npm install n8n

# "Install" the locally published module
npm link @digital-boss/n8n-nodes-humhub

# Start n8n
npx n8n
```

[//]: # (## Latest functionality)


## Contribution

To make this node even better, please let us know, [how you use it](mailto:info@digital-north-consulting.com). Commits are always welcome.

## Issues

If you have any issues, please [let us know on GitHub](https://github.com/digital-boss/n8n-nodes-humhub/issues).

## About

Special thanks to [N8n nodemation](https://n8n.io) workflow automation by Jan Oberhauser.

Nodes by [digital-north-consulting.com](https://digital-north-consulting.com). For productive use and consulting on this, [contact us please](mailto:info@digital-north-consulting.com).

This node was updated with ❤️ by Valentina Lilova [valentina98](https://github.com/valentina98)

# License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
