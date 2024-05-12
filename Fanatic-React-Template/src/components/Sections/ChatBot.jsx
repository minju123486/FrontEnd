import React from "react";

export default function ChatBot() {
  return (
    <div className="chatbot-container">
      {/* ä�� �޽��� */}
      <div className="chat-messages">
        {/* ���⿡ ä�� �޽����� ��Ÿ���� ������Ʈ �Ǵ� ��Ҹ� �������� */}
        <div className="message">�ȳ��ϼ���! ��� ���͵帱���?</div>
      </div>

      {/* �Է�â */}
      <div className="chat-input">
        <input type="text" placeholder="�޽����� �Է��ϼ���..." />
        <button>����</button>
      </div>
    </div>
  );
}