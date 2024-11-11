const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const voiceSelect = document.getElementById("voiceSelect");

const speechSynth = window.speechSynthesis;

// Populate available voices
let voices = [];
const populateVoices = () => {
    voices = speechSynth.getVoices();
    voiceSelect.innerHTML = ''; // Clear any existing options
    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = index;
        voiceSelect.appendChild(option);
    });
};
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

convertBtn.addEventListener('click', function () {
    const enteredText = text.value;
    const error = document.querySelector('.error-para');

    if (!speechSynth.speaking && !enteredText.trim().length) {
        error.textContent = `Nothing to Convert! 
        Enter text in the text area.`;
        return; // Prevent further execution
    }

    if (!speechSynth.speaking && enteredText.trim().length) {
        error.textContent = "";
        const newUtter = new SpeechSynthesisUtterance(enteredText);

        // Set selected voice
        const selectedVoiceIndex = voiceSelect.value;
        if (voices[selectedVoiceIndex]) {
            newUtter.voice = voices[selectedVoiceIndex];
        }

        speechSynth.speak(newUtter);
        convertBtn.textContent = "Sound is Playing...";
    }

    setTimeout(() => {
        convertBtn.textContent = "Play Converted Sound";
    }, 5000);
});
