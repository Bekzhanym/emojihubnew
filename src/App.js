import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import { ToastContainer, toast } from "react-toastify";
import { FaGithub, FaInstagram,FaLinkedin  } from "react-icons/fa";
 // Импортируем иконки
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]); // Корзина с выбранными эмодзи
  const [lastClickedEmoji, setLastClickedEmoji] = useState(null); // Для отслеживания последнего выбранного эмодзи

  const onEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;

    // Проверяем, если тот же стикер был кликнут дважды
    if (lastClickedEmoji === emoji) {
      // Если стикер уже есть в корзине, не добавляем его
      if (!cart.includes(emoji)) {
        setCart((prevCart) => [...prevCart, emoji]); // Добавляем эмодзи в корзину
        toast.success("Эмодзи добавлен в корзину!");
      } else {
        toast.info("Этот эмодзи уже в корзине!");
      }

      setLastClickedEmoji(null); // Сбросим последний выбранный эмодзи после добавления в корзину
    } else {
      setLastClickedEmoji(emoji); // Сохраняем последний выбранный эмодзи
      toast.info("Нажмите снова на этот стикер, чтобы добавить его в корзину");
    }

    setSelectedEmoji(emoji); // Обновляем выбранный эмодзи
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const removeFromCart = (emojiToRemove) => {
    setCart(cart.filter((emoji) => emoji !== emojiToRemove)); // Удаляем эмодзи из корзины
    toast.info("Эмодзи удален из корзины!");
  };

  // Используем useEffect для добавления класса к body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  return (
    <div className="app">
      {/* Добавляем кнопки Instagram и GitHub в верхнюю часть */}
      <div className="social-buttons">
        <a href="https://github.com/Bekzhanym" target="_blank" rel="noopener noreferrer">
          <FaGithub size={60} />
        </a>
        <a href="https://instagram.com/bekzhzz" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={60} />
        </a>
        <a href="https://www.linkedin.com/in/bekzhanmaukenov/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={60} />
        </a>
      </div>

      <button className="toggle-button" onClick={toggleTheme}>
        {darkMode ? "🌞 Светлая тема" : "🌙 Тёмная тема"}
      </button>

      <h1>Emoji Hub</h1>
      <h2>By Bekzhan Maukenov</h2>
      <p>Выберите эмодзи и он будет добавлен в вашу корзину при двойном клике!</p>

      <div className="cart-container">
        <h3>Ваша корзина (Избранное)</h3>
        {cart.length > 0 ? (
          <div className="cart-items">
            {cart.map((emoji, index) => (
              <div key={index} className="cart-item">
                <span>{emoji}</span>
                <button onClick={() => removeFromCart(emoji)}>✅</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Корзина пуста</p>
        )}
      </div>

      <div className="emoji-picker-container">
        <p>Выберите эмодзи:</p>
        <EmojiPicker onEmojiClick={onEmojiClick} />
      </div>

      {selectedEmoji && (
        <p className="selected-emoji">Вы выбрали: {selectedEmoji}</p>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
