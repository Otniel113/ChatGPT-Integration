document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');
    
    // Change with your API key
    const api_key = 'YOUR-API-KEY'

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = chatInput.value.trim();

        if (message.length === 0) return;

        chatOutput.innerHTML += `<p class="user-message">${message}</p>`;
        chatInput.value = '';
        chatOutput.scrollTop = chatOutput.scrollHeight;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + api_key,
            },
            body: JSON.stringify(
                {
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": message}]
                }
            )
        });

        if (response.ok) {
            const data = await response.json();
            chatOutput.innerHTML += `<p class="bot-message">${data.choices[0].message.content}</p>`;
            chatOutput.scrollTop = chatOutput.scrollHeight;
        } else {
            alert('Error communicating with ChatGPT API');
        }
    });
});