import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ChevronDown, 
  BookOpen, 
  Scale, 
  RefreshCw, 
  CheckCircle,
  HelpCircle,
  Minimize2,
  Mic,
  MicOff
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Simple and highly secure custom formatter for formatting text response into beautiful styled elements
const formatMessageText = (text: string) => {
  if (!text) return '';

  // Handle bullets, bold text, and newline layouts cleanly
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    let processed = line;

    // Bold replacement (**text** or *text*)
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const italicRegex = /\*([^*]+)\*/g;

    // Bullet points (starting with • or - or *)
    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*');
    if (isBullet) {
      processed = line.replace(/^[•\-*]\s*/, '');
    }

    // Parse bold/italic HTML safely using React element structure
    const parseMarkup = (str: string) => {
      const parts = [];
      let lastIndex = 0;
      let match;

      // Reset regex index
      boldRegex.lastIndex = 0;

      while ((match = boldRegex.exec(str)) !== null) {
        if (match.index > lastIndex) {
          parts.push(str.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="font-bold text-blue-900 bg-blue-50/50 px-1 py-0.5 rounded border border-blue-100/30">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < str.length) {
        parts.push(str.substring(lastIndex));
      }

      // If no bold, try italics
      if (parts.length === 1 && typeof parts[0] === 'string') {
        const italicParts = [];
        let italicLastIndex = 0;
        let italicMatch;
        italicRegex.lastIndex = 0;

        while ((italicMatch = italicRegex.exec(str)) !== null) {
          if (italicMatch.index > italicLastIndex) {
            italicParts.push(str.substring(italicLastIndex, italicMatch.index));
          }
          italicParts.push(<em key={italicMatch.index} className="italic text-slate-700 bg-slate-50/60 px-1 py-0.5 rounded">{italicMatch[1]}</em>);
          italicLastIndex = italicRegex.lastIndex;
        }

        if (italicLastIndex < str.length) {
          italicParts.push(str.substring(italicLastIndex));
        }
        return italicParts;
      }

      return parts;
    };

    const parsedContent = parseMarkup(processed);

    if (isBullet) {
      return (
        <li key={idx} className="ml-4 list-disc text-xs text-slate-700 my-1 leading-relaxed">
          {parsedContent}
        </li>
      );
    }

    return (
      <p key={idx} className="text-xs text-slate-700 my-1 leading-relaxed min-h-[4px]">
        {parsedContent}
      </p>
    );
  });
};

export const SportTechAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Merhaba! Ben **Sport Tech AI**. Türkiye'nin öncü spor teknolojileri ekosistem portalı SportTech Türkiye'nin akıllı asistanıyım. 🤖⚡️\n\nSize nasıl yardımcı olabilirim? Örneğin şunları sorabilirsiniz:\n\n• **'Sportsepeti'nin spor kütüphanesinden yüzmenin faydalarını ara'** 🏊‍♂️\n• **'7405 sayılı yeni spor kulüpleri kanununu sorgula'** 📜\n• **'Mevzuat veri tabanınızda hangi resmi kaynaklar indeksli?'** 🔍\n• **'Sporcu lisans tescili ve kulüpler arası transfer şartları nelerdir?'** ⚽️",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTip, setShowScrollTip] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API for Turkish recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'tr-TR';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(prev => {
            const trimmed = prev.trim();
            return trimmed ? `${trimmed} ${transcript}` : transcript;
          });
        }
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Tarayıcınız ses tanıma özelliğini desteklemiyor. Lütfen Chrome, Safari veya Edge kullanın.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
      }
    }
  };

  const chatEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { text: "🏊‍♂️ Yüzmenin faydaları", query: "Sporsepeti spor kütüphanesinden yüzmenin faydalarını ara" },
    { text: "📜 7405 Sayılı Kanun nedir?", query: "7405 sayılı spor kulüpleri kanununu sorgula" },
    { text: "⚽️ Lisans & Transfer kuralları", query: "Sporcu lisans çıkarma ve transfer şartları nelerdir?" },
    { text: "🔍 Hangi kaynaklar indeksli?", query: "Sisteminizde hangi resmi mevzuat kaynakları indeksli?" }
  ];

  // Auto-scroll logic
  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    chatEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
    }
  }, [isOpen, messages]);

  // Monitor scroll to display bottom toggle if user scrolled up
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    // Show scroll tip if scrolled up more than 150px
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 150;
    setShowScrollTip(isScrolledUp);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history in correct format for Gemini SDK
      // Skip the first welcome message to keep payload light
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history })
      });

      if (!response.ok) {
        throw new Error('Yapay zeka servisi yanıt vermedi.');
      }

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        text: data.text || 'Üzgünüm, şu an bağlantı kuramıyorum.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: "Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="sporttech-ai-root">
      {/* Dynamic Slide-Up Chat Panel */}
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-[380px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-120px)] bg-white/98 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform translate-y-0 scale-100 origin-bottom-right"
          id="sporttech-ai-panel"
        >
          {/* Header Panel */}
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">Sport Tech AI</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Yapay Zeka Asistanı</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400 hover:text-white"
                title="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Panel */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 scroll-smooth"
            id="sporttech-ai-messages"
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
                    {/* Bot Avatar */}
                    {!isUser && (
                      <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-blue-400">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {/* Message Bubble */}
                    <div className={`p-3.5 rounded-2xl shadow-2xs border ${
                      isUser 
                        ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' 
                        : 'bg-white text-slate-800 border-slate-100 rounded-tl-none'
                    }`}>
                      {isUser ? (
                        <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <div className="space-y-1">
                          {formatMessageText(msg.text)}
                        </div>
                      )}
                      <span className={`text-[8px] mt-1.5 block text-right opacity-60`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* AI Typing Loader */}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex items-start gap-2.5 max-w-[80%]">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-blue-400">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-2xs">
                    <div className="flex gap-1.5 py-1 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                      Mevzuat & Spor Kütüphanesi taranıyor...
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Floater Bottom Scroll Auto button */}
          {showScrollTip && (
            <button 
              onClick={() => scrollToBottom('smooth')}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-semibold px-3 py-1.5 rounded-full border border-slate-800 shadow-lg flex items-center gap-1.5 hover:bg-slate-950 transition-colors"
            >
              <span>Son Mesajlara Dön</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          )}

          {/* Quick Prompt Suggestion Chips */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 bg-slate-50/50 border-t border-slate-100 flex flex-wrap gap-1.5 shrink-0 max-h-[85px] overflow-y-auto">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(p.query)}
                  className="text-[10px] font-semibold text-slate-600 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-full px-2.5 py-1 transition-all text-left shadow-2xs hover:text-blue-700 cursor-pointer"
                >
                  {p.text}
                </button>
              ))}
            </div>
          )}

          {/* Form Input Footer */}
          <form 
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-slate-200/80 flex gap-2 items-center shrink-0"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Dinleniyor, lütfen konuşun..." : "Sorunuzu buraya yazın..."}
              disabled={isLoading}
              className={`flex-1 border focus:bg-white focus:outline-none rounded-xl px-3.5 py-2 text-xs transition-all ${
                isListening 
                  ? 'bg-red-50/50 border-red-300 placeholder-red-400 text-red-900 focus:border-red-400' 
                  : 'bg-slate-50 border-slate-200 focus:border-blue-500 text-slate-800 placeholder-slate-400'
              }`}
            />
            {/* Interactive Voice Mic Toggle Button */}
            <button
              type="button"
              onClick={toggleListening}
              disabled={isLoading}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer relative ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-md animate-pulse' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
              title={isListening ? "Dinlemeyi Durdur" : "Sesli Komut Gönder"}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                </>
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 text-white disabled:text-slate-400 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Primary Floating Circle Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-slate-900 hover:bg-slate-950 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-2xl relative border border-slate-800/80 group cursor-pointer"
        id="sporttech-ai-toggle"
        title="Sport Tech AI Asistanı"
      >
        {isOpen ? (
          <Minimize2 className="w-5 h-5 text-slate-300" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-5.5 h-5.5 text-blue-400 transition-transform group-hover:rotate-12" />
            {/* Soft Breathing Notification Spark Dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-slate-900 rounded-full animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
};
