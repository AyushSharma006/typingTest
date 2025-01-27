const typingText = document.getElementById("typing-text");
const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const mistakes = document.getElementById("mistakes");
const input = document.getElementById("in");
const reset = document.getElementById('reset-btn');
const type = document.getElementById('type');

function loadPara() {
  const para = [
    "We live in an era dominated by technology. Smartphones, tablets, and computers have become essential tools in our daily lives. The internet connects people across the globe, breaking down barriers and enabling instant communication. Social media platforms provide a space to share ideas, experiences, and creativity. However, balancing screen time with real-world interactions is crucial for maintaining mental and emotional well-being.",
    "The beauty of nature is unparalleled. From the serene tranquility of a forest to the rhythmic crashing of ocean waves, the natural world offers endless inspiration. A walk through a blooming meadow, with colorful flowers swaying in the breeze, reminds us of the simplicity and elegance of life. The rustling leaves and chirping birds create a symphony that soothes the soul. Nature’s ability to refresh and rejuvenate the mind is truly remarkable.",
    "Books have the power to transport us to other worlds, times, and dimensions. A well-written story can ignite the imagination and stir deep emotions. Whether it's a thrilling mystery, a heartwarming romance, or a profound piece of nonfiction, books provide an escape and a chance to learn. They encourage critical thinking, expand vocabulary, and inspire creativity. A book in hand is a gateway to endless possibilities.",
    "Cooking is both an art and a science. Experimenting with ingredients, flavors, and techniques can result in delightful culinary creations. The process of preparing a meal, from chopping vegetables to plating the dish, can be incredibly satisfying. Sharing food with loved ones strengthens bonds and creates cherished memories. The kitchen, often considered the heart of the home, is a place where traditions are passed down and innovation takes root.",
    "Regular exercise is vital for maintaining a healthy body and mind. Physical activity boosts energy levels, improves mood, and reduces the risk of chronic diseases. Whether it’s a brisk walk, a yoga session, or an intense workout at the gym, moving your body has countless benefits. Exercise also enhances focus and productivity, making it a cornerstone of a balanced lifestyle. Start small, stay consistent, and watch your health transform.",
  ];
  
  let randomPara = para[Math.floor(Math.random() * para.length)];
  typingText.innerHTML = ''; 

  for (let char of randomPara) {
    typingText.innerHTML += `<span>${char}</span>`;
  }

  document.addEventListener("keydown", () => {
    input.focus();
  });

  typingText.addEventListener("click", () => {
    input.focus();
  });

  typingText.querySelector("span").classList.add("active");
}

loadPara();

let isTyping = false;
let charIndex = 0;
let maxTime = 60;
let mistakeCount = 0;
let time = maxTime;
let typer;

input.addEventListener("keydown", (e) => {
  const char = typingText.querySelectorAll("span");
  const typedCharacter = e.key;
  const currChar = char[charIndex].innerText;
  type.innerHTML = "";

  if (charIndex < char.length && time > 0) {    

    if (!isTyping) {
      isTyping = true;
      typer = setInterval(() => {
        if (time > 0) {
          time--;
          timer.innerHTML = time;
          if (maxTime - time > 0) {
            let wpmC = Math.round(((charIndex - mistakeCount) / 5) / (maxTime - time) * 60);
            wpm.innerText = wpmC;
          }
        } else {
          clearInterval(typer);
          isTyping = false;
        }
      }, 1000);
    }

    char[charIndex].classList.remove('active');

    if (typedCharacter === currChar) {
      char[charIndex].classList.add("correct");
      ++charIndex;
    } else if (typedCharacter === 'Shift' || typedCharacter === 'CapsLock') {
      charIndex = charIndex;
    } else {
      char[charIndex].classList.add("incorrect");
      mistakeCount++;
      ++charIndex;
    }

    if (charIndex < char.length) {
      char[charIndex].classList.add('active');
    }

    mistakes.innerHTML = mistakeCount;
  }
});

reset.addEventListener('click', () => {
  console.log('reset clicked');
  typingText.innerHTML = '';
  timer.innerHTML = maxTime;
  wpm.innerHTML = 0;
  mistakes.innerHTML = 0;
  mistakeCount = 0;
  time = maxTime;
  isTyping = false;
  charIndex = 0;
  type.innerHTML = "Type to start";
  clearInterval(typer);
  loadPara();
});

