import React, { useState } from "react";
import { Box, Typography, TextField, Button, Select, MenuItem } from "@mui/material";
var StellarSdk = require("@stellar/stellar-sdk");

var server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);
  const [publicKey, setPublicKey] = useState("");
  const [userKeypair] = useState(StellarSdk.Keypair.random()); // For demo purposes, a new keypair is generated on each load
  const [attemptCount, setAttemptCount] = useState(0);

  const questions = [
    {
      label:
        "Question 1: What is the process by which plants make their own food? A) Respiration B) Photosynthesis C) Fermentation",
      name: "question1",
    },
    {
      label:
        "Question 2: Which part of the plant is responsible for absorbing water and nutrients? A) Leaves B) Roots C) Flowers",
      name: "question2",
    },
    {
      label:
        "Question 3: What type of plant is a tomato? A) Root B) Fruit C) Leaf",
      name: "question3",
    },
    // New question 4
    {
      label:
        "Question 4: Which gas is released by plants during photosynthesis? A) Oxygen B) Carbon Dioxide C) Nitrogen",
      name: "question4",
    },
    // New question 5
    {
      label:
        "Question 5: What is the main pigment needed for photosynthesis? A) Chlorophyll B) Anthocyanin C) Carotene",
      name: "question5",
    },
    // New question 6
    {
      label:
        "Question 6: How do plants primarily obtain carbon dioxide? A) From the soil B) From water C) From the air",
      name: "question6",
    },
  ];

  const handleInputChange = (event) => {
    const { value } = event.target;
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handlePublicKeyChange = (event) => {
    setPublicKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log(JSON.stringify({ answers, userPublicKey: publicKey }));
    event.preventDefault();
    // Submit answers to the backend
    try {
      const response = await fetch("http://localhost:8000/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers, userPublicKey: publicKey }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Congratulations! You have won tokens!");
      } else {
        alert("Sorry, your answers are not correct.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Increase the attempt count and reset the quiz
    setAttemptCount(attemptCount + 1);
    setCurrentQuestionIndex(0);
    setAnswers(["", "", "", "", "", ""]);
    setPublicKey("");
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div>
      <div style={{ position: "absolute", top: 0, right: 0, padding: "10px" }}>
        <span>Attempts: {attemptCount}</span>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ position: "absolute", top: 0, right: 0, padding: "10px" }}>
          <Typography>Attempts: {attemptCount}</Typography>
        </Box>
        <Typography variant="h4" gutterBottom>
          Plant Quiz
        </Typography>
        <form onSubmit={handleSubmit}>
          {questions.map(
            (question, index) =>
              currentQuestionIndex === index && (
                <Box key={question.name} sx={{ my: 2 }}>
                  <Typography>{question.label}</Typography>
                  <Select
                    fullWidth
                    name={question.name}
                    onChange={handleInputChange}
                    value={answers[currentQuestionIndex] || ""}
                    margin="normal"
                  >
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                  </Select>
                  {index < questions.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={handleNextQuestion}
                      sx={{ mt: 2 }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              )
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <Box sx={{ my: 2 }}>
              <TextField
                fullWidth
                label="Enter your Stellar Public Key"
                value={publicKey}
                onChange={handlePublicKeyChange}
                margin="normal"
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit Answers
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </div>
  );
};

export default Quiz;
