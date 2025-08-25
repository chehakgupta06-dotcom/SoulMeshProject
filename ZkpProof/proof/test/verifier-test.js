const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Groth16Verifier", function () {
  let verifier;

  beforeEach(async function () {
    const Verifier = await ethers.getContractFactory("Groth16Verifier");
    verifier = await Verifier.deploy();
    await verifier.waitForDeployment();
  });

  it("should be deployed successfully", async function () {
    expect(await verifier.getAddress()).to.be.properAddress;
  });

  it("should verify a valid proof", async function () {
    // Sample proof points and public signals
    // These values should be replaced with actual proof data generated from your circuit
    const pA = [
      "20491192805390485299153009773594534940189261866228447918068658471970481763042",
      "9383485363053290200918347156157836566562967994039712273449902621266178545958"
    ];

    const pB = [
      [
        "6375614351688725206403948262868962793625744043794305715222011528459656738731",
        "4252822878758300859123897981450591353533073413197771768651442665752259397132"
      ],
      [
        "10505242626370262277552901082094356697409835680220590971873171140371331206856",
        "21847035105528745403288232691147584728191162732299865338377159692350059136679"
      ]
    ];

    const pC = [
      "11559732032986387107991004021392285783925812861821192530917403151452391805634",
      "4082367875863433681332203403145435568316851327593401208105741076214120093531"
    ];

    // Public signals (inputs/outputs that were made public in the circuit)
    const pubSignals = [
      "1451193133033985622675974395212898695894420218423981349444775983416323297705",
      "6447804039682332744983541066842759692406915920150656950370867868891728310125",
      "2276565553259163190059968305908537035580282621107837127696787732925205140758"
    ];

    const result = await verifier.verifyProof(pA, pB, pC, pubSignals);
    expect(result).to.be.true;
  });
}); 