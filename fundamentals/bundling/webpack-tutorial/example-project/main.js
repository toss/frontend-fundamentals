document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  const formattedDate = dateFns.format(today, 'MMMM d, yyyy');
  document.getElementById('dateDisplay').textContent = formattedDate;
  
  showRandomEmoji();
});

function showRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const selectedEmoji = emojis[randomIndex];
  
  document.getElementById('emojiDisplay').textContent = selectedEmoji.icon;
  document.getElementById('emojiName').textContent = selectedEmoji.name;
}