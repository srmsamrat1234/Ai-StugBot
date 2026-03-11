import { useEffect, useRef } from "react";
import styles from "./Chat.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! I'm your AI STUG-Bot. How can I assist you today?"
};

export function Chat({ messages }) {

  const chatRef = useRef(null);

  const displayMessages =
    messages.length === 0 ? [WELCOME_MESSAGE] : messages;

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [displayMessages]);

  return (
    <div className={styles.Chat} ref={chatRef}>
      {displayMessages.map(({ role, content }, index) => (
        <div key={index} className={styles.Message} data-role={role}>

          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>

        </div>
      ))}
    </div>
  );
}