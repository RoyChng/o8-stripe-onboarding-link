require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const jsonParser = bodyParser.json();

app.use(express.static("public"));

app.post("/create-login-link", jsonParser, async (req, res) => {
  // Checks if request contains account ID
  if (!req.body.account_id) {
    res.json({
      status: "failed",
      message: "No Account ID Given!",
    });
    return;
  }
  try {
    // Attempts to create login link
    const loginLink = await stripe.accounts.createLoginLink(
      req.body.account_id
    );

    if (!loginLink) {
      res.json({
        status: "failed",
        messsage: "Failed to create login link, please try again!",
      });
    }

    // Sends response with login link URL
    res.json({
      status: "success",
      messsage: "Created Login Link",
      url: loginLink.url,
    });
  } catch (error) {
    // Logs and responds with error message
    console.error(error);
    res.json({
      status: "failed",
      messsage: "Account ID does not exist!",
    });
  }
});

app.listen(7001, () => {
  console.log("Running on port 7001");
});
