'use client'

import { useState, useEffect } from 'react'

interface SocialConnection {
  id: string
  name: string
  icon: string
  description: string
  connected: boolean
  soulPoints: number
  url: string
  category: string
  verificationRequired?: boolean
  verificationData?: {
    type: string
    message: string
    score?: number
    lastDigits?: string
    placeholder?: string
  }
}

const TABS = [
  { id: 'credit', label: 'Credit' },
  { id: 'on-chain', label: 'On-chain Activities' },
  { id: 'social', label: 'Social' },
  { id: 'identity', label: 'Identity' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'legal', label: 'Legal Identity' },
]

const INITIAL_SOCIAL_CONNECTIONS: SocialConnection[] = [
  // Credit Category
  {
    id: 'creditScore',
    name: 'Credit Score',
    icon: '💳',
    description: 'Connect your traditional credit score.',
    connected: false,
    soulPoints: 200,
    url: 'https://credit.example.com/connect',
    category: 'credit'
  },
  {
    id: 'creditKarma',
    name: 'Credit Karma',
    icon: '📊',
    description: 'Link your Credit Karma account.',
    connected: false,
    soulPoints: 150,
    url: 'https://creditkarma.example.com/connect',
    category: 'credit'
  },
  // On-chain Activities
  {
    id: 'ethereumWallet',
    name: 'Ethereum Wallet',
    icon: '⟠',
    description: 'Connect your Ethereum wallet activity.',
    connected: false,
    soulPoints: 180,
    url: 'https://ethereum.example.com/connect',
    category: 'on-chain'
  },
  {
    id: 'defiScore',
    name: 'DeFi Score',
    icon: '🏦',
    description: 'Link your DeFi protocol interactions.',
    connected: false,
    soulPoints: 160,
    url: 'https://defi.example.com/connect',
    category: 'on-chain'
  },
  // Social Category
  {
    id: 'x',
    name: 'X',
    icon: '𝕏',
    description: 'Connect to X to verify your social media presence.',
    connected: false,
    soulPoints: 100,
    url: 'https://x.com/oauth',
    category: 'social',
    verificationRequired: true,
    verificationData: {
      type: 'username',
      message: 'Verify X Account',
      placeholder: '@username'
    }
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    description: 'Verify your professional network.',
    connected: false,
    soulPoints: 120,
    url: 'https://linkedin.com/oauth',
    category: 'social'
  },
  {
    id: 'google',
    name: 'Google',
    icon: 'G',
    description: 'Connect your Google account.',
    connected: false,
    soulPoints: 80,
    url: 'https://accounts.google.com/oauth',
    category: 'social'
  },
  // Identity Category
  {
    id: 'sibilScore',
    name: 'Sibil Score',
    icon: '📊',
    description: 'Connect your Sibil Score to boost your reputation.',
    connected: false,
    soulPoints: 150,
    url: 'https://sibil.example.com/connect',
    category: 'identity',
    verificationRequired: true,
    verificationData: {
      type: 'score',
      message: 'Your Sibil Score',
      score: 750
    }
  },
  {
    id: 'brightid',
    name: 'BrightID',
    icon: '🌟',
    description: 'Verify your unique human identity.',
    connected: false,
    soulPoints: 140,
    url: 'https://brightid.org/connect',
    category: 'identity'
  },
  // Gaming Category
  {
    id: 'steam',
    name: 'Steam',
    icon: '🎮',
    description: 'Connect your Steam gaming profile.',
    connected: false,
    soulPoints: 90,
    url: 'https://steam.example.com/connect',
    category: 'gaming'
  },
  {
    id: 'xbox',
    name: 'Xbox',
    icon: '🎯',
    description: 'Link your Xbox gaming achievements.',
    connected: false,
    soulPoints: 80,
    url: 'https://xbox.example.com/connect',
    category: 'gaming'
  },
  // Legal Identity
  {
    id: 'mAdhar',
    name: 'mAdhar',
    icon: '🆔',
    description: 'Verify your identity with mAdhar.',
    connected: false,
    soulPoints: 200,
    url: 'https://madhar.example.com/verify',
    category: 'legal',
    verificationRequired: true,
    verificationData: {
      type: 'aadhar',
      message: 'Verify Aadhar',
      lastDigits: '4321'
    }
  },
  {
    id: 'passport',
    name: 'Passport Verification',
    icon: '📘',
    description: 'Verify your passport credentials.',
    connected: false,
    soulPoints: 180,
    url: 'https://passport.example.com/verify',
    category: 'legal'
  }
]

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState('credit')
  const [connections, setConnections] = useState<SocialConnection[]>(INITIAL_SOCIAL_CONNECTIONS)

  // Emit soul points information whenever connections change
  useEffect(() => {
    const soulPointsInfo = connections.map(conn => ({
      name: conn.name,
      points: conn.soulPoints,
      connected: conn.connected
    }));

    window.dispatchEvent(new CustomEvent('soulPointsUpdate', { 
      detail: { points: soulPointsInfo }
    }));
  }, [connections]);

  const handleConnection = async (connectionId: string) => {
    const connection = connections.find(c => c.id === connectionId)
    if (!connection) return

    if (connection.connected) {
      // Handle disconnection
      setConnections(prev => prev.map(conn => 
        conn.id === connectionId ? { ...conn, connected: false } : conn
      ))
      return
    }

    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask to connect services!')
      return
    }

    // Show verification page if required
    if (connection.verificationRequired) {
      const getServiceStyles = (id: string) => {
        switch (id) {
          case 'x':
            return {
              background: '#000000',
              buttonColor: '#1d9bf0',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }
          case 'google':
            return {
              background: '#ffffff',
              buttonColor: '#1a73e8',
              fontFamily: 'Roboto, arial, sans-serif'
            }
          case 'sibilScore':
            return {
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              buttonColor: '#4ade80',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          case 'mAdhar':
            return {
              background: 'linear-gradient(135deg, #FF6B6B 0%, #556270 100%)',
              buttonColor: '#ffd700',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
          default:
            return {
              background: '#0a0b14',
              buttonColor: '#22c55e',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }
        }
      }

      const styles = getServiceStyles(connection.id)
      const verificationPage = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Verify ${connection.name}</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: ${styles.background};
                color: ${connection.id === 'google' ? '#202124' : 'white'};
                font-family: ${styles.fontFamily};
              }
              .container {
                background: ${connection.id === 'x' ? '#000000' : 'rgba(255,255,255,0.1)'};
                border: 1px solid ${connection.id === 'x' ? '#333333' : 'rgba(255,255,255,0.2)'};
                padding: 2rem;
                border-radius: 1rem;
                max-width: 400px;
                width: 90%;
                text-align: center;
              }
              .title {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: ${connection.id === 'google' ? '#202124' : 'white'};
              }
              .info {
                font-size: ${connection.id === 'mAdhar' ? '2rem' : '1.5rem'};
                color: ${styles.buttonColor};
                margin: 1.5rem 0;
                ${connection.id === 'mAdhar' ? 'font-family: monospace; letter-spacing: 2px;' : ''}
              }
              .message {
                opacity: 0.8;
                margin-bottom: 1.5rem;
              }
              .buttons {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
              }
              button {
                width: 100%;
                padding: 0.75rem;
                border: none;
                border-radius: 0.5rem;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.2s;
              }
              .confirm {
                background: ${styles.buttonColor};
                color: ${connection.id === 'mAdhar' ? 'black' : 'white'};
              }
              .cancel {
                background: transparent;
                border: 1px solid ${connection.id === 'x' ? '#333333' : 'rgba(255,255,255,0.2)'};
                color: ${connection.id === 'google' ? styles.buttonColor : 'white'};
              }
              button:hover {
                opacity: 0.9;
              }
            </style>
          </head>
          <body>
            <div class="container">
              ${getVerificationContent(connection)}
            </div>
            <script>
              document.querySelector('.confirm')?.addEventListener('click', () => {
                window.opener.postMessage({
                  type: 'verification',
                  connectionId: '${connection.id}',
                  confirmed: true
                }, '*');
              });
              
              document.querySelector('.cancel')?.addEventListener('click', () => {
                window.opener.postMessage({
                  type: 'verification',
                  connectionId: '${connection.id}',
                  confirmed: false
                }, '*');
                window.close();
              });
            </script>
          </body>
        </html>
      `

      const width = 500
      const height = 400
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2

      const verificationWindow = window.open(
        'about:blank',
        `Verify ${connection.name}`,
        `width=${width},height=${height},left=${left},top=${top}`
      )

      if (verificationWindow) {
        verificationWindow.document.write(verificationPage)

        // Handle verification response
        const handleMessage = (event: MessageEvent) => {
          if (event.data.type === 'verification' && event.data.connectionId === connection.id) {
            window.removeEventListener('message', handleMessage)
            if (event.data.confirmed) {
              verificationWindow.close()
              proceedWithConnection(connection)
            }
          }
        }

        window.addEventListener('message', handleMessage)
      }
    } else {
      proceedWithConnection(connection)
    }
  }

  const getVerificationContent = (connection: SocialConnection) => {
    if (!connection.verificationData) return ''

    switch (connection.verificationData.type) {
      case 'score':
        return `
          <h2 class="title">Your Sibil Score</h2>
          <div class="info">${connection.verificationData.score}</div>
          <p class="message">Would you like to connect this score to your profile?</p>
          <div class="buttons">
            <button class="confirm">Continue with Sibil</button>
            <button class="cancel">Cancel</button>
          </div>
        `
      case 'username':
        return `
          <img src="https://about.twitter.com/content/dam/about-twitter/x/large-x-logo.png.twimg.1920.png" 
               alt="X logo" 
               style="width: 40px; height: 40px; margin-bottom: 1rem;">
          <h2 class="title">Sign in to X</h2>
          <div class="info">@johndoe</div>
          <p class="message">Confirm your X account to continue</p>
          <div class="buttons">
            <button class="confirm">Continue with X</button>
            <button class="cancel">Not you?</button>
          </div>
        `
      case 'aadhar':
        return `
          <h2 class="title">Verify with mAadhar</h2>
          <div class="info">XXXX XXXX ${connection.verificationData.lastDigits}</div>
          <p class="message">Confirm your Aadhar number to continue</p>
          <div class="buttons">
            <button class="confirm">Verify Identity</button>
            <button class="cancel">Cancel</button>
          </div>
        `
      default:
        return ''
    }
  }

  const proceedWithConnection = async (connection: SocialConnection) => {
    try {
      console.log('Requesting MetaMask connection...')
      
      // Request account access without chain restriction
      const provider = window.ethereum
      
      // Now request account access
      console.log('Requesting account access...')
      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      })

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts returned from MetaMask')
      }

      // Get current network for logging
      const chainId = await provider.request({ method: 'eth_chainId' })
      console.log('MetaMask connected:', accounts[0], 'on chain:', chainId)

      // Create a mock connection page
      const mockPage = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Connecting to ${connection.name}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                background: #0a0b14;
                color: white;
              }
              .loader {
                border: 4px solid #1c1d29;
                border-top: 4px solid #22c55e;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .success {
                color: #22c55e;
                text-align: center;
              }
              .steps {
                margin: 20px 0;
                text-align: left;
                width: 80%;
                max-width: 400px;
              }
              .step {
                margin: 10px 0;
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .step.completed {
                color: #22c55e;
              }
              .check {
                font-size: 1.2em;
              }
            </style>
          </head>
          <body>
            <div class="loader"></div>
            <p>Connecting to ${connection.name}...</p>
            <div class="steps">
              <div class="step" id="step1">
                <span class="check">✓</span>
                <span class="completed">MetaMask connected</span>
              </div>
              <div class="step" id="step2">
                <span class="check">⭕</span>
                <span>Initializing connection...</span>
              </div>
              <div class="step" id="step3">
                <span class="check">⭕</span>
                <span>Minting verification token...</span>
              </div>
              <div class="step" id="step4">
                <span class="check">⭕</span>
                <span>ZKP Verification...</span>
              </div>
            </div>
          </body>
        </html>
      `

      // Open connection window
      const width = 500
      const height = 600
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2

      const connectionWindow = window.open(
        'about:blank',
        `Connect ${connection.name}`,
        `width=${width},height=${height},left=${left},top=${top}`
      )

      if (connectionWindow) {
        // Write the mock page content
        connectionWindow.document.write(mockPage)
        
        // Step 2: Initialize
        setTimeout(() => {
          const step2 = connectionWindow?.document.getElementById('step2')
          if (step2) {
            step2.innerHTML = `
              <span class="check">✓</span>
              <span class="completed">Connection initialized</span>
            `
          }

          // Step 3: Mint token
          setTimeout(async () => {
            try {
              // Simulate a token mint transaction
              const transactionParameters = {
                to: accounts[0],
                from: accounts[0],
                value: '0x0',
                data: '0x', // This would normally be the mint function call
              }

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
              }

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
                          <div class="success">
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

            } catch (mintError: unknown) {
              const errorMessage = mintError instanceof Error ? mintError.message : 'Unknown error'
              if (connectionWindow?.document?.body) {
                connectionWindow.document.body.innerHTML = `
                  <div style="color: #ef4444; text-align: center;">
                    <h2>❌ Transaction Failed</h2>
                    <p>Failed to mint verification token: ${errorMessage}</p>
                    <p>Please try again later.</p>
                  </div>
                `
              }
              setTimeout(() => connectionWindow?.close(), 3000)
            }
          }, 1000)
        }, 1000)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Connection failed: ${errorMessage}. Please try again.`)
    }
  }

  return (
    <div className="rounded-2xl bg-[#060709] p-6">
      <div className="flex gap-2 overflow-x-auto pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {connections
          .filter(connection => connection.category === activeTab)
          .map((connection) => (
          <div id="myClasses" 
            key={connection.id}
            className="p-4 rounded-xl bg-[#1c1d29] flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#14151f] flex items-center justify-center text-xl">
                {connection.icon}
              </div>
              <div>
                <h4 className="font-medium">{connection.name}</h4>
                <p className="text-sm text-gray-400">{connection.description}</p>
                <p className="text-sm text-yellow-500">+{connection.soulPoints} Soul Points</p>
              </div>
            </div>
            <button
              onClick={() => handleConnection(connection.id)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                connection.connected
                  ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {connection.connected ? 'Connected' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}