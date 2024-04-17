Absolutely, here's the fixed markdown:

Yaksha 1.0
Yaksha: Quiz and Games App

Yaksha is an interactive quiz and games application that leverages the Stellar network to provide a fun and engaging experience for users. Built with React and integrated with the Stellar SDK, Yaksha offers a se
# Yaksha 1.0

**Yaksha: Quiz and Games App**

Yaksha is an interactive quiz and games application that leverages the Stellar network to provide a fun and engaging experience for users. Built with React and integrated with the Stellar SDK, Yaksha offers a seamless gaming experience with the added benefits of cryptocurrency transactions.

## Features

- **Quiz Games:** Participate in a variety of quiz games and challenge your knowledge.
- **Stellar Integration:** Utilize the Stellar network for secure and fast in-app currency transactions.
- **Rewards:** Earn rewards in cryptocurrency for your performance in games.

## Getting Started

To get started with Yaksha, you'll need to have Node.js and npm installed on your system. Follow the steps below to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/yaksha.git
   cd yaksha

# Instructions

## Installation


### Start the development server:

## Using npm
  ```bash
   npm install
   ```

# Using Yarn
  ```bash
   yarn install
  ```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## Configuration

To integrate with the Stellar network, you must set up the Stellar SDK with your project. Follow the instructions below to configure the Stellar SDK.

The Stellar SDK allows you to interact with the Stellar network. It provides APIs to build and sign transactions, connect to Horizon, and more. Below is a guide on how to integrate the Stellar SDK into your project.

### Prerequisites

- Node.js installed on your machine
- Basic knowledge of JavaScript and Node.js
- An existing Node.js project or a new one

### Step 1: Install Stellar SDK

To use Stellar SDK, you need to install it via npm (Node Package Manager). Open your terminal, navigate to your project directory, and run:

   ```bash
   npm install --save stellar-sdk
  ```

### Step 2: Import Stellar SDK

In the JavaScript file where you want to use the Stellar SDK, import it at the top of the file:

```javascript
const StellarSdk = require('stellar-sdk');
```

### Step 3: Set Up Server Connection

To interact with the Stellar network, you need to connect to a Horizon server. You can connect to the public Horizon server or set up your own.

```javascript
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
```

### Step 4: Create a Key Pair

To create a new Stellar account, you need a key pair consisting of a public key and a secret key.

```javascript
const pair = StellarSdk.Keypair.random();
console.log("Public Key:", pair.publicKey());
console.log("Secret Key:", pair.secret());
```

### Step 5: Create an Account

To create an account on the Stellar testnet, you can use the Friendbot service to fund your account with test Lumens (XLM).

```javascript
(async function() {
  const response = await fetch(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
  );
  const responseJSON = await response.json();
  console.log("Account created:", responseJSON);
})();
```
### Step 6: Building and Submitting a Transaction

To send a transaction, such as sending Lumens to another account, you need to build and sign the transaction before submitting it to the network.

```javascript
(async function() {
  const account = await server.loadAccount(pair.publicKey());
  const transaction = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET
  })
    .addOperation(StellarSdk.Operation.payment({
      destination: 'RECIPIENT_PUBLIC_KEY',
      asset: StellarSdk.Asset.native(),
      amount: '10'
    }))
    .setTimeout(30)
    .build();

  transaction.sign(pair);

  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log("Transaction successful:", transactionResult);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
})();
```

## Conclusion

You have now integrated the Stellar SDK into your Node.js project. You can create accounts, submit transactions, and listen for payments on the Stellar network. Always remember to switch from the testnet to the public network for production applications by changing the Horizon server URL and the network passphrase.

For more advanced features and documentation, visit the [Stellar Developer Documentation](https://www.stellar.org/developers/).

- Create a `.env` file in the root directory of the project.
- Add your Stellar public and secret keys to the `.env` file:

```plaintext
REACT_APP_STELLAR_PUBLIC_KEY=YourPublicKeyHere
REACT_APP_STELLAR_SECRET_KEY=YourSecretKeyHere
```

Make sure to replace YourPublicKeyHere and YourSecretKeyHere with your actual Stellar keys.

## Usage

Once the application is running, you can:

- Sign up or log in to your account.
- Answer questions and earn points.

## Contact

Project Link: [https://github.com/daiwikmaheshwari/yaksha1.0](https://github.com/daiwikmaheshwari/yaksha1.0)

Enjoy playing and learning with Yaksha, your go-to quiz app on the Stellar network!# Yaksha 1.0

