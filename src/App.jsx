import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "./abi.json";

const contractAddress = "0x9D1eb059977D71E1A21BdebD1F700d4A39744A70";

function App() {
  const [getText, setGetText] = useState("");
  const [error, setError] = useState("");

  async function requestAccount() {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (err) {
        setError("User denied account access");
      }
    } else {
      setError("Please install MetaMask only. Other wallets are not supported.");
    }
  }

  async function getTextFromContract() {
    setError("");
    try {
      await requestAccount();
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(contractAddress, abi, await provider);
      const data = await contract.get();
      setGetText(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching data from the contract.");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Web3Bridge Contract Interaction</h2>
      <button onClick={getTextFromContract}>Get Text</button>
      {getText && <p><strong>Response from Contract:</strong> {getText}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
