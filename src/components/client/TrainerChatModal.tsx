import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, User, Check, Phone, ShieldCheck } from 'lucide-react';

export const TrainerChatModal: React.FC = () => {
  const { isTrainerChatOpen, closeTrainerChat, user, trainers } = useApp();

  const assignedTrainer = trainers.find((t) => t.id === user?.activePlan?.assignedTrainerId) || trainers[0];

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'trainer',
      text: `Hey ${user?.name.split(' ')[0] || 'Rahul'}! Looking forward to our session tomorrow at 7:00 PM. I'm bringing the 28kg hex dumbbells and power loop bands for our chest hypertrophy routine.`,
      time: '10:15 AM',
    },
    {
      id: 'm2',
      sender: 'client',
      text: 'Thanks Arjun! Living room is already cleared. Should I do any warmup before you arrive?',
      time: '10:30 AM',
    },
    {
      id: 'm3',
      sender: 'trainer',
      text: '5 minutes of thoracic spine rotations and cat-cow will be plenty. See you tomorrow right on time!',
      time: '10:32 AM',
    },
  ]);

  const [input, setInput] = useState('');

  if (!isTrainerChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'client',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Simulated quick coach response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-reply-${Date.now()}`,
          sender: 'trainer',
          text: 'Got it! Noted on your training profile. Keep up the high protein intake today.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l-2 border-black animate-in slide-in-from-right duration-200">
        
        {/* Top Header */}
        <div className="p-4 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <img
              src={assignedTrainer.photo}
              alt={assignedTrainer.name}
              className="w-10 h-10 object-cover border border-white"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-editorial text-base font-black uppercase text-white tracking-tight">
                  {assignedTrainer.name}
                </h3>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
              <p className="text-[10px] text-[#8DD8FF] font-semibold uppercase tracking-wider">
                Assigned Personal Trainer · Online
              </p>
            </div>
          </div>

          <button onClick={closeTrainerChat} className="p-1 text-neutral-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
          <div className="p-2.5 bg-neutral-200/60 text-center text-[11px] text-neutral-600 font-medium">
            Direct secure communication with your certified coach.
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'client' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                  m.sender === 'client'
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-white text-neutral-900 border border-neutral-300 shadow-xs'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] block mt-1 text-right ${
                    m.sender === 'client' ? 'text-neutral-400' : 'text-neutral-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message for your coach..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2.5 bg-neutral-50 border border-neutral-300 text-xs font-medium text-black focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#FF6A00] hover:bg-[#e05d00] text-white transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
