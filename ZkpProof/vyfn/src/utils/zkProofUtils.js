const snarkjs = require('snarkjs');

export const generateProof = async (inputA, inputB) => {
  try {
    // Load the circuit artifacts
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      { a: inputA, b: inputB },
      "/multiplier.wasm",
      "/multiplier_final.zkey"
    );

    // Generate verification key input
    const vKey = await fetch('/verification_key.json').then(res => res.json());
    
    // Verify the proof
    const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

    return {
      proof,
      publicSignals,
      isValid
    };
  } catch (error) {
    console.error("Error generating proof:", error);
    throw error;
  }
};

export const verifyProof = async (proof, publicSignals) => {
  try {
    const vKey = await fetch('/verification_key.json').then(res => res.json());
    return await snarkjs.groth16.verify(vKey, publicSignals, proof);
  } catch (error) {
    console.error("Error verifying proof:", error);
    throw error;
  }
}; 