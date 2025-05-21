import { useState, useRef, useEffect } from "react";
import { askBot } from "../../axios/openai";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { IoClose } from "react-icons/io5"; // أيقونة إغلاق

export default function Chatbot({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const notificationSound = new Audio("/notification.mp3");
  const { t } = useTranslation("chatbot");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const currentLanguage = i18n.language;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, products]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const { reply, products } = await askBot(input, currentLanguage);
    notificationSound.play();

    setMessages([...newMessages, { role: "bot", content: reply }]);
    setProducts(products || []);
  };

  // يعرض النص حسب اللغة المختارة
  const getLocalized = (obj, key) => {
    if (!obj) return "";
    if (typeof obj[key] === "object") {
      return obj[key][currentLanguage] || obj[key].en || obj[key].ar || "";
    }
    return obj[key];
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-8 fixed bottom-4 right-4 z-50 w-[90vw] sm:w-[400px]">
      {/* زر إغلاق الشات بوت */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
        onClick={onClose}
        aria-label={t("close")}
        type="button"
      >
        <IoClose />
      </button>

      <h2 className="text-2xl font-bold mb-4">{t("title")}</h2>

      <div className="h-80 overflow-y-auto border p-4 mb-4 rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat ${
              msg.role === "user" ? "chat-end" : "chat-start"
            }`}
          >
            <div
              className={`chat-bubble ${
                msg.role === "user"
                  ? "chat-bubble-primary"
                  : "chat-bubble-accent"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {products.length > 0 && (
          <div className="mt-4 space-y-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-start gap-4 p-2 border rounded bg-white shadow-sm cursor-pointer hover:bg-gray-100 transition"
                onClick={() => navigate(`/shop/${p.id}`)}
                title={getLocalized(p, "name")}
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={getLocalized(p, "name")}
                    className="w-16 h-16 object-cover rounded border"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-sm">
                    {getLocalized(p, "name")}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {t("price")}: {p.price}{" "}
                    {currentLanguage === "ar" ? "جنيه" : "USD"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {getLocalized(p, "description")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered flex-1"
          placeholder={t("placeholder")}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button className="btn bg-gray-400 hover:bg-gray-500" onClick={handleSend}>
          {t("send")}
        </button>
      </div>
    </div>
  );
}
