// JavaScript source code
const form = document.getElementById("post");
const input = document.getElementById("textbox");
const messages = document.getElementById("communication");
const apiKey = "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";

const preText = "Hi im Doctor Chatbot feel free to ask me any mental health related questions, i should also say bye when people tell me bye";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value;
    input.value = "";

    messages.innerHTML += `<div class="message userInput">
  <img src="./Images/man1.png" alt="user icon"> <span1>${message}</span1>
  </div>`;

    // Use axios library to make a POST request to the OpenAI API
    const Reply = await axios.post(
        "https://api.openai.com/v1/completions",
        {
            prompt: preText + `${message}`,
            model: "text-davinci-003",
            temperature: 0,
            max_tokens: 4000,
            top_p: 1,
        },
        {
         headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${apiKey}`,
         },
        }
    );
    const chatbotReply = Reply.data.choices[0].text;

    messages.innerHTML += `<div class="message chatbotOutput">
  <img src="./Images/doctor.png" alt="bot icon"> <span2>${chatbotReply}</span2>
  </div>`;
});