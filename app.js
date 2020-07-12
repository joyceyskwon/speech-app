const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const response = document.querySelector('.response');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const greetings = ["I'm doing well thank you", "Not doing so well", "Leave me alone"];
const weather = ["Weather is terrible", "It's raining cats and dogs", "It's sunny"];

recognition.onstart = () => {
  console.log('voice is activated, you can speak to microphone');
  onStartMessage();
};

recognition.onresult = (e) => {
  const current = e.resultIndex;
  const transcript = e.results[current][0].transcript;
  content.textContent = "Q: " + transcript.charAt(0).toUpperCase() + transcript.slice(1) + "?";
  answerQuestion(transcript);
};

btn.addEventListener('click', () => {
  recognition.start();
});

const onStartMessage = () => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = "Ask away!";
  window.speechSynthesis.speak(speech);
}

const answerQuestion = (msg) => {
  let finalText;
  const defaultResponse = "Sorry, didn't catch that";
  const speech = new SpeechSynthesisUtterance();
  
  if (msg.includes("how are you")) {
    finalText = greetings[Math.floor(Math.random() * greetings.length)];
    response.textContent = "A: " + finalText + ".";
    speech.text = finalText;
  } else if (msg.includes("weather")) {
    finalText = weather[Math.floor(Math.random() * weather.length)];
    response.textContent = "A: " + finalText + ".";
    speech.text = finalText;
  } else {
    response.textContent = "A: " + defaultResponse + ".";
    speech.text = defaultResponse;
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}