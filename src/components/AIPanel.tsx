import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AIPanelProps {
  onAiModeChange: (active: boolean) => void;
  aiMode: boolean;
}

export default function AIPanel({ onAiModeChange, aiMode }: AIPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    const newMessages = [...messages];

    // If first message, add system message about inheriting conditions
    if (messages.length === 0) {
      newMessages.push({
        id: `sys-${Date.now()}`,
        role: 'system',
        content: '既存の検索条件を引き継ぎました。',
      });
    }

    newMessages.push(userMsg);

    // Simulate AI response
    const aiResponse: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: generateMockResponse(input.trim()),
    };
    newMessages.push(aiResponse);

    setMessages(newMessages);
    setInput('');

    // Activate AI mode overlay
    if (!aiMode) {
      onAiModeChange(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([]);
    onAiModeChange(false);
  };

  if (collapsed) {
    return (
      <div className="w-10 bg-[#f0f4f8] border-l border-gray-200 flex flex-col items-center pt-3 shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors text-sm"
          title="AIパネルを展開"
        >
          «
        </button>
        <span className="mt-2 text-xs text-gray-400 writing-vertical" style={{ writingMode: 'vertical-rl' }}>
          AI
        </span>
      </div>
    );
  }

  return (
    <div className="w-[350px] bg-[#f0f4f8] border-l border-gray-200 flex flex-col shrink-0">
      {/* Panel header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200/60 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">✨</span>
          <span className="font-medium text-gray-800 text-sm">AI アシスタント</span>
        </div>
        <div className="flex items-center gap-1">
          {aiMode && (
            <button
              onClick={handleReset}
              className="text-xs text-sky-500 hover:text-sky-700 mr-2"
            >
              リセット
            </button>
          )}
          <button
            onClick={() => setCollapsed(true)}
            className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white rounded transition-colors text-sm"
            title="パネルを縮小"
          >
            »
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-sm text-gray-500 leading-relaxed">
            <p className="mb-3">こんにちは！どんな企業リストを作りたいですか？</p>
            <p className="text-xs text-gray-400 bg-white/60 rounded p-3 leading-relaxed">
              例：「製造業で海外展開している中堅企業」
            </p>
            <p className="mt-3 text-xs text-gray-400">
              左のフィルターで条件を設定してから話しかけると、その条件を引き継ぎます。
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'system' ? (
                <div className="w-full text-center">
                  <span className="text-[11px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {msg.content}
                  </span>
                </div>
              ) : (
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-sky-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  {msg.content}
                </div>
              )}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className="px-3 py-3 border-t border-gray-200/60 shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="どんなリストを作りたいですか？"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400 focus:border-sky-400 bg-white"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-3 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}

function generateMockResponse(userInput: string): string {
  if (userInput.includes('製造業') || userInput.includes('製造')) {
    return '製造業の企業を検索しています。従業員数100名以上の中堅製造業として32社が見つかりました。テーブルに結果を表示しています。';
  }
  if (userInput.includes('IT') || userInput.includes('SaaS') || userInput.includes('テック')) {
    return 'IT・SaaS関連企業を検索しています。該当する企業が45社見つかりました。営業支援、マーケティング、HR系のSaaS企業が中心です。';
  }
  if (userInput.includes('海外') || userInput.includes('グローバル')) {
    return '海外展開している企業を検索しています。輸出実績のある企業、海外拠点を持つ企業を含め、28社が該当しました。';
  }
  return `「${userInput}」の条件で企業を検索しています。該当する企業が${Math.floor(Math.random() * 50) + 10}社見つかりました。結果をテーブルに反映しました。`;
}
