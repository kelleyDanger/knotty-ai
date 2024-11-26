import React, { useState } from 'react';
import { Button, TextField, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { HelpOutline } from "@mui/icons-material";

function QueryForm() {
  const [response, setResponse] = useState(null);
  // const [blanketSize, setBlanketSize] = useState(null);
  // const [yarnWeight, setYarnWeight] = useState(null);
  const [query, setQuery] = useState("");

  const handleQuery = async () => {
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:1b",
          prompt: query,
          stream: false,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse({ error: error.message });
    }
  };

  return (
    <div>
      {/* <Typography variant="h4" gutterBottom>
        Design Your Crochet Blanket
      </Typography> */}

      {/* Blanket Size Selection */}
      {/* <Typography variant="h6" gutterBottom>
        Select Blanket Size:
      </Typography>
      <ToggleButtonGroup
        value={blanketSize}
        exclusive
        onChange={(e, newSize) => setBlanketSize(newSize)}
        style={{ marginBottom: "20px" }}
      >
        {["King", "Queen", "Twin", "Lap", "Baby"].map((size) => (
          <ToggleButton key={size} value={size} style={{ textTransform: "capitalize" }}>
            {size}
          </ToggleButton>
        ))}
        <ToggleButton value="Any" style={{ textTransform: "capitalize" }}>
          Any
        </ToggleButton>
      </ToggleButtonGroup> */}

      {/* Yarn Weight Selection */}
      {/* <Typography variant="h6" gutterBottom>
        Select Yarn Weight:
      </Typography>
      <ToggleButtonGroup
        value={yarnWeight}
        exclusive
        onChange={(e, newWeight) => setYarnWeight(newWeight)}
        style={{ marginBottom: "20px" }}
      >
        {[
          { value: "0", label: "Lace" },
          { value: "1", label: "Super Fine" },
          { value: "2", label: "Fine" },
          { value: "3", label: "Light" },
          { value: "4", label: "Medium" },
          { value: "5", label: "Bulky" },
          { value: "6", label: "Super Bulky" },
          { value: "7", label: "Jumbo" },
        ].map((weight) => (
          <ToggleButton key={weight.value} value={weight.label}>
            {weight.label}
          </ToggleButton>
        ))}
        <ToggleButton value="Any">
          <HelpOutline />
          Any
        </ToggleButton>
      </ToggleButtonGroup> */}


      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        label="Enter your query"
        variant="outlined"
        className="mb-4"
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleQuery}
        // disabled={!blanketSize && !yarnWeight}
      >
        Submit
      </Button>
      {response && (
        <Box mt={4}>
          <Typography variant="h6">Response:</Typography>
          <Typography
            variant="body1"
            component="pre"
            style={{
              whiteSpace: "pre-wrap",
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {JSON.stringify(response, null, 2)}
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default QueryForm;
