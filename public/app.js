const sendBtn = document.getElementById('sendBtn');
const msgInput = document.getElementById('msgInput');
const messagesDiv = document.getElementById('messages');

let lastMessageCount = 0;

// Загружаем сообщения, добавляя только новые
async function loadMessages() {
  try {
    const res = await fetch('/messages');
    const msgs = await res.json();

    // Если количество сообщений не изменилось — ничего не делаем
    if (msgs.length === lastMessageCount) return;

    // Добавляем только новые сообщения
    const newMsgs = msgs.slice(lastMessageCount);
    newMsgs.forEach(m => addMessage(m.text));

    lastMessageCount = msgs.length;
  } catch (err) {
    console.error('Ошибка при загрузке сообщений:', err);
  }
}

// Добавляем сообщение с плавным появлением
function addMessage(text) {
  const msg = document.createElement('div');
  msg.className = 'message';
  msg.textContent = text;
  msg.style.opacity = 0;
  msg.style.transform = 'translateY(10px)';

  messagesDiv.appendChild(msg);

  // Плавное появление
  requestAnimationFrame(() => {
    msg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    msg.style.opacity = 1;
    msg.style.transform = 'translateY(0)';
  });

  // Плавная прокрутка вниз
  messagesDiv.scrollTo({
    top: messagesDiv.scrollHeight,
    behavior: 'smooth'
  });
}

// Отправка нового сообщения
sendBtn.addEventListener('click', async () => {
  const text = msgInput.value.trim();
  if (!text) return;

  try {
    await fetch('/send', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text })
    });
    msgInput.value = '';
    loadMessages();
  } catch (err) {
    console.error('Ошибка при отправке сообщения:', err);
  }
});

// Отправка по Enter
msgInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendBtn.click();
});

// Автообновление каждые 2 секунды
setInterval(loadMessages, 2000);
loadMessages();
