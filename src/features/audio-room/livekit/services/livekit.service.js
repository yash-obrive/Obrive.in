import { AudioPresets, Room, RoomEvent } from "livekit-client";

class LiveKitService {
  constructor() {
    this.room = null;
    this.isConnecting = false;
    this.pendingDisconnect = false;
    this.remoteAudioElements = new Map();
  }

  async connect({ token, roomId }) {
    try {
      this.disconnect();
      this.isConnecting = true;
      this.pendingDisconnect = false;

      const livekitUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

      this.room = new Room({
        publishDefaults: {
          audioPreset: AudioPresets.musicHighQuality,
          dtx: false,
          red: true,
        },
      });

      this.room.on(
        RoomEvent.TrackSubscribed,
        (track, publication, participant) => {
          if (track.kind !== "audio") {
            return;
          }

          const element = track.attach();

          element.autoplay = true;
          element.playsInline = true;
          element.dataset.participantIdentity = participant.identity;
          element.dataset.trackSid = publication.trackSid;
          element.style.display = "none";

          document.body.appendChild(element);

          this.remoteAudioElements.set(publication.trackSid, element);

          console.log("Remote audio attached", participant.identity);
        },
      );

      this.room.on(RoomEvent.TrackUnsubscribed, (track, publication) => {
        const element = this.remoteAudioElements.get(publication.trackSid);

        if (!element) {
          return;
        }

        track.detach(element);
        element.remove();
        this.remoteAudioElements.delete(publication.trackSid);
      });

      this.room.on(RoomEvent.AudioPlaybackStatusChanged, () => {
        console.log(
          "LiveKit audio playback:",
          this.room?.canPlaybackAudio ? "allowed" : "blocked",
        );
      });

      await this.room.connect(livekitUrl, token);

      console.log("LiveKit connected:", roomId);

      if (this.pendingDisconnect) {
        this.disconnect();
      }

      return this.room;
    } catch (error) {
      console.error("LiveKit connection error:", error);

      throw error;
    } finally {
      this.isConnecting = false;

      if (this.pendingDisconnect && this.room) {
        this.disconnect();
      }
    }
  }

  disconnect() {
    if (this.isConnecting) {
      this.pendingDisconnect = true;
      return;
    }

    if (this.room) {
      this.room.disconnect();
      this.room = null;
    }

    this.remoteAudioElements.forEach((element) => element.remove());
    this.remoteAudioElements.clear();
    this.pendingDisconnect = false;
  }

  getRoom() {
    return this.room;
  }

  async enableMicrophone() {
    try {
      if (!this.room) {
        return false;
      }

      if (!this.room.localParticipant?.permissions?.canPublish) {
        console.error("Mic enable blocked: LiveKit canPublish is false");
        return false;
      }

      await this.room.localParticipant.setMicrophoneEnabled(true, {
        echoCancellation: true,
        noiseSuppression: false,
        autoGainControl: false,
      });

      return Boolean(this.room.localParticipant.isMicrophoneEnabled);
    } catch (error) {
      console.error("Mic enable error:", error);

      return false;
    }
  }

  async disableMicrophone() {
    try {
      if (!this.room) {
        return false;
      }

      await this.room.localParticipant.setMicrophoneEnabled(false);

      return true;
    } catch (error) {
      console.error("Mic disable error:", error);

      return false;
    }
  }

  isMicrophoneEnabled() {
    return Boolean(this.room?.localParticipant?.isMicrophoneEnabled);
  }
}

export default new LiveKitService();
