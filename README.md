# Web3Auth Test

The app is live at [https://web3auth-test.netlify.app/](https://web3auth-test.netlify.app/)

## Motivation

We want users to interact with Web3 apps **without any wallet** and **without any crypto**. Plasmic allows devs and designers to work together in a smooth way.

## Setup

#### 1. Clone this Plasmic project

- Go to [https://studio.plasmic.app/projects/gT4hmyT4Gfq9iSDYjENowj](https://studio.plasmic.app/projects/gT4hmyT4Gfq9iSDYjENowj)
- Click on `Copy Project`

#### 2. Clone this repo

Fork this Github repo, clone it locally, cd into it and:

```shell
npm i
```

#### 3. Sync with your Plasmic project

```shell
plasmic sync
plasmic watch
```

[TODO: [verify these instructions](https://github.com/ATO-nft/web3auth-test/issues/4)]

## Run

Copy the [`.env.example`](https://github.com/ATO-nft/web3auth-test/blob/main/.env.example) file and rename it `.env`. In this `.env` file, you want to:

- Replace `REACT_APP_WEB3_AUTH_CLIENT_ID`: you can get one [here](https://dashboard.web3auth.io/)
- Replace `REACT_APP_RPC_URL`: you can create one [here](https://infura.io/). We're using Ropsten Testnet.
- Replace `REACT_APP_FAUCET_PRIVATE_KEY`: [learn how to export a private key from MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key). This wallet must hold > 0.0001 Ropsten ETH.

```shell
npm start
```

## Docs

- [Plasmic docs](https://docs.plasmic.app/)
- [Web3Auth docs](https://web3auth.io/docs/)
- [Ethers.js docs](https://docs.ethers.io/v5/)

## Support

You can contact us via [Element](https://matrix.to/#/@julienbrg:matrix.org) (preferred), [Twitter](https://twitter.com/julienbrg), [Discord](https://discord.gg/xw9dCeQ94Y), [LinkedIn](https://www.linkedin.com/in/julienberanger/) or [email](mailto:julien@ato.network).

You also can find me in [Plasmic Slack](https://plasmiccommunity.slack.com/join/shared_invite/zt-eh1z610i-zIMLVKv1htHicx0xdfcIjw#/shared-invite/email).
