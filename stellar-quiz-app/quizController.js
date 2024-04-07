var StellarSdk = require("@stellar/stellar-sdk");

try {
  var server = new StellarSdk.Horizon.Server(
    "https://horizon-testnet.stellar.org"
  );
  // console.log("Server:", server)

  const secretKey = process.env.QUIZ_ACCOUNT_SECRET;
  // console.log("secretkey:", secretKey)
  const sourceKeypair = StellarSdk.Keypair.fromSecret(secretKey);
  const sourcePublicKey = sourceKeypair.publicKey();

  async function checkQuizAndReward(req, res) {
    console.log("Request:", req.body);
    // Validate request body
    if (!req.body.answers || !req.body.userPublicKey) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
    console.log("Is answers empty checked");

    const { answers, userPublicKey } = req.body;
    const correctAnswers = ["B", "B", "B", "B", "B", "B"];
    const isWinner = answers.every((answer, index) => answer === correctAnswers[index]);


    console.log("Right anser separated");

    if (isWinner) {
      try {
        const sourceAccount = await server.loadAccount(sourcePublicKey);
        console.log("Source Account Loaded");

        const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: StellarSdk.Networks.TESTNET,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: userPublicKey,
              asset: StellarSdk.Asset.native(),
              amount: "10", // reward
            })
          )
          .setTimeout(30)
          .build();
        console.log("Transaction defined");

        // Sign the transaction with the source account
        transaction.sign(sourceKeypair);
        console.log("Transaction signed");

        // Submit the transaction to Stellar
        const transactionResult = await server.submitTransaction(transaction);
        console.log("Transaction submitted to stellar");
        res.json({ success: true, transactionResult });
      } catch (error) {
        console.error("Error in checkQuizAndReward:", error);
        res.status(500).json({ success: false, error: error.message });
      }
    } else {
      res.json({ success: false, message: "Wrong answers" });    }
  }

  module.exports = { checkQuizAndReward };
} catch (err) {
  console.log("Error creating account:", err.message);
}
