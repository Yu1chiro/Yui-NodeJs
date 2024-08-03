import fs from 'fs';
import speech from '@google-cloud/speech';
// Create a client
const client = new speech.SpeechClient({
  keyFilename: 'path/to/your/google-cloud-service-account.json' // Ganti dengan path ke file JSON kredensial Anda
});

async function transcribeAudio(fileName) {
  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  // Configure the request
  const audio = {
      content: audioBytes,
  };
  const config = {
      encoding: 'LINEAR16', // Ubah encoding sesuai dengan format file audio Anda
      sampleRateHertz: 16000, // Ubah sample rate sesuai dengan file audio Anda
      languageCode: 'id-ID', // Ubah sesuai dengan bahasa yang digunakan dalam audio
  };
  const request = {
      audio: audio,
      config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
  console.log(`Transcription: ${transcription}`);
}

// Panggil fungsi transcribeAudio dengan nama file audio sebagai argumen
transcribeAudio('path/to/your/audio/file.wav');