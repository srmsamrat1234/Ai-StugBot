import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY
});

export class Assistant {

  async chat(messages) {

    try {

      const response = await openrouter.chat.send({
        chatGenerationParams: {
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant named STUG-Bot, designed to assist users with their questions and tasks. Always provide clear and concise answers, and feel free to ask follow-up questions if you need more information to assist the user effectively.
`
            },
            ...messages
          ]
        }
      });

      return response?.choices?.[0]?.message?.content || "No response from AI";

    } catch (error) {

      console.error("OpenRouter API Error:", error);

      return "⚠️ AI service error. Please try again.";

    }

  }

}