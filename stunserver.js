// Create a new RTCPeerConnection and use Google's STUN server
const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302", // Google's public STUN server
    },
  ],
};

// Create the RTCPeerConnection instance
const peerConnection = new RTCPeerConnection(configuration);

// Set up event handlers to capture ICE candidates (public/private IPs)
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    console.log("New ICE Candidate found:", event.candidate);
    // You can send the ICE candidate to the signaling server (via Socket.IO)
    // Example: socket.emit('ice-candidate', event.candidate);
  } else {
    console.log("All ICE candidates have been gathered.");
  }
};

// OPTIONAL: You can also handle ICE connection state changes to monitor connection state
peerConnection.oniceconnectionstatechange = () => {
  console.log("ICE connection state:", peerConnection.iceConnectionState);
  if (peerConnection.iceConnectionState === "failed") {
    console.log("ICE connection failed, trying TURN or reconnecting...");
  }
};

// OPTIONAL: You can handle ICE gathering state changes to know when ICE candidates are done being gathered
peerConnection.onicegatheringstatechange = () => {
  console.log("ICE gathering state:", peerConnection.iceGatheringState);
};

// Create an offer (this is just an example of creating a WebRTC connection)
const createOffer = async () => {
  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console.log("Offer created:", offer);
    // Send the offer to the signaling server (via Socket.IO)
    // Example: socket.emit('offer', offer);
  } catch (error) {
    console.error("Error creating offer:", error);
  }
};

// Trigger the creation of the offer
createOffer();
