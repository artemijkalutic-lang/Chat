const sendBtn = document.getElementById('sendBtn');
const msgInput = document.getElementById('msgInput');
const messagesDiv = document.getElementById('messages');

async function loadMessages() {
  const res = await fetch('/messages');
  const msgs = await res.json();
  messagesDiv.innerHTML = msgs.map(m => `<div class="message">${m.text}</div>`).join('');
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // авто-прокрутка вниз
}

sendBtn.addEventListener('click', async () => {
  const text = msgInput.value.trim();
  if (!text) return;

  await fetch('/send', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text })
  });

  msgInput.value = '';
  loadMessages();
});

// автообновление каждые 2 секунды
setInterval(loadMessages, 2000);
loadMessages();
