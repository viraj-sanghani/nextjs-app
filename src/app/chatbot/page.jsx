import dynamic from "next/dynamic";
const Bot = dynamic(() => import("@/Bot/Bot"));

function Chatbot() {
  return <Bot fullScreen={true} />;
}

export default Chatbot;
