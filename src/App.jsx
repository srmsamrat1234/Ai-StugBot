import { useState } from "react";
import { Assistant } from "./assistants/googleai";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";

const assistant = new Assistant();

function App() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  function addMessage(message) {
    setMessages((prev) => [...prev, message]);
  }

  async function handleContentSend(content) {

    if (!content.trim() || loading) return;

    const userMessage = {
      role: "user",
      content
    };

    const updatedMessages = [...messages, userMessage];

    addMessage(userMessage);
    setLoading(true);

    try {

      const reply = await assistant.chat(updatedMessages);

      const assistantIndex = updatedMessages.length;

      // add empty assistant message first
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" }
      ]);

      let i = 0;

      const interval = setInterval(() => {

        setMessages((prev) => {

          const newMessages = [...prev];

          newMessages[assistantIndex] = {
            role: "assistant",
            content: reply.slice(0, i)
          };

          return newMessages;
        });

        i++;

        if (i > reply.length) {
          clearInterval(interval);
        }

      }, 15);

    } catch (error) {

      console.error("AI Error:", error);

      addMessage({
        role: "assistant",
        content: "⚠️ AI service error. Please try again."
      });

    } finally {
      setLoading(false);
    }

  }

  return (
    <div className={styles.App}>

      <header className={styles.Header}>
        <img
          className={styles.Logo}
          src="/computer.png"
          alt="logo"
        />
        <h2 className={styles.Title}>STUG-Bot</h2>
      </header>

      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>

      <Controls
        onSend={handleContentSend}
        disabled={loading}
      />

    </div>
  );
}

export default App;