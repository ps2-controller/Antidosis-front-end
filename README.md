
# Overview

The smart contracts for this project are housed in the [Antidosis repo](https://github.com/ps2-controller/Antidosis).

Antidosis is a [Harberger tax](https://medium.com/@simondlr/what-is-harberger-tax-where-does-the-blockchain-fit-in-1329046922c6) implementation on Ethereum that applies Harberger taxes in a non-traditional way that aims to preserve the incentive structure of traditional Harberger taxes. 

Normally, Harberger taxes are applied to nonfungible assets, targeting efficient distribution of taxed property given individual variances in valuation of nonfungible assets. 

Antidosis varies from this pattern in that rather than directly Harberger-taxing the nonfungible asset, it is broken into discrete, *fungible* shares which are ([loosely](https://medium.com/hummingbot/the-myth-of-the-erc-20-token-standard-ab0d76cf8532)) compliant with the ERC-20 standard. Share owners are expected to have diminishing returns in their valuation of each additional share, which enables a market in which valuations are determined under a Harberger scheme. Shares can be nonconsensually purchased from owners at their self-assessed valuation.

## Improvements on traditional tokenization

Traditionally, tokenization structures that break an asset into shares have poor redeemability frameworks. The total supply of shares should be redeemable for the underlying asset, so the value of the sum of all shares should equal the market value of the underlying asset. However, if this is enforced on-chain, and one owner accidentally burns or loses even a single share, the underlying asset would no longer be redeemable, and all other owners' shares would become instantly worthless. 

Workarounds for this issue tend to be some variant of the "controller" approach, in which a centralized entity is able to deterministically roll back or manipulate token ownership. This approach redistributes jurisdictional authority from the Ethereum settlement layer to a third party, vastly reducing the ownership guarantees of a blockchain. In this case, the use of a blockchain has some minor transparency benefits, but in terms of settlement offers several disadvantages in comparison with a traditional database. 

Antidosis solves this issue by removing the need for controller requirements to preserve share value. If a token-owner loses their private key, one of the two following possibilities guarantees redeemability of the underlying asset's value:

- Their escrowed funds run out, and they are no longer able to pay taxes; this opens the market for anyone to declare a nonzero valuation and claim ownership of the tokens.
- Another owner purchases the tokens from the burned address at the declared valuation. No action from the burned address is required.

This ensures that the underlying asset always remains redeemable at market rate while preserving settlement for share ownership at the blockchain layer. 

__

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
