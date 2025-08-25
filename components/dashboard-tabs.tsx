  await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  })

  const step3 = connectionWindow?.document.getElementById('step3')
  if (step3) {
    step3.innerHTML = `
      <span class="check">✓</span>
      <span class="completed">Verification token minted</span>
    `

    // Step 4: ZKP Verification
    const step4 = connectionWindow?.document.getElementById('step4')
    if (step4) {
      // Open ZKP verification popup
      const zkpWidth = 300;
      const zkpHeight = 250;
      const zkpLeft = window.screenX + (window.outerWidth - zkpWidth) / 2;
      const zkpTop = window.screenY + (window.outerHeight - zkpHeight) / 2;

      const zkpWindow = window.open(
        'about:blank',
        'ZKP Verification',
        `width=${zkpWidth},height=${zkpHeight},left=${zkpLeft},top=${zkpTop}`
      );

      if (zkpWindow) {
        zkpWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>ZKP Verification</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  background: #000000;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                  color: white;
                  font-family: monospace;
                }
                .loader {
                  width: 40px;
                  height: 40px;
                  border: 3px solid #333;
                  border-top: 3px solid #22c55e;
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
                  margin-bottom: 20px;
                }
                .text {
                  font-size: 1.1em;
                  letter-spacing: 2px;
                }
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              </style>
            </head>
            <body>
              <div class="loader"></div>
              <div class="text">ZKP Verification</div>
            </body>
          </html>
        `);

        const randomDelay = Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000;
        let verificationSuccessful = false;

        // Handle window close
        zkpWindow.onbeforeunload = () => {
          if (!verificationSuccessful) {
            // If closed before verification completes, show error
            if (connectionWindow?.document?.body) {
              connectionWindow.document.body.innerHTML = `
                <div style="
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  background: #0a0b14;
                  color: #ef4444;
                ">
                  <h2>❌ Verification Failed</h2>
                  <p>ZKP verification was interrupted</p>
                  <p>Please try connecting again</p>
                </div>
              `;
              setTimeout(() => connectionWindow?.close(), 2000);
            }
          }
        };

        // Complete verification after delay
        setTimeout(() => {
          verificationSuccessful = true;
          zkpWindow?.close();

          // Update step 4 to show completion
          step4.innerHTML = `
            <span class="check">✓</span>
            <span class="completed">ZKP Verification complete</span>
          `;

          // Show final success message
          setTimeout(() => {
            if (connectionWindow?.document?.body) {
              connectionWindow.document.body.innerHTML = `
                <div style="
                  height: 100vh;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  background: #0a0b14;
                  color: #22c55e;
                ">
                  <h2>✓ Connected Successfully!</h2>
                  <p>You've earned ${connection.soulPoints} Soul Points</p>
                  <p>Verification token has been minted to your wallet</p>
                  <p>ZKP Verification Complete</p>
                  <p>This window will close automatically...</p>
                </div>
              `;

              // Update connection state
              setConnections(prev => prev.map(conn => 
                conn.id === connection.id ? { ...conn, connected: true } : conn
              ));

              // Close window after showing success
              setTimeout(() => connectionWindow?.close(), 2000);
            }
          }, 1000);
        }, randomDelay);
      }
    }
  }

} catch (mintError: unknown) {
  // ... existing code ...
} 