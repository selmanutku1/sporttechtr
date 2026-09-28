import React, { useState } from 'react';
import { X, Send, Mail, User, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import { ContactMessage } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSubmitMessage }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmitMessage(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form and close modal after success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        onClose();
      }, 3000);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
          <h2 className="text-xl font-display font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            {language === 'tr' ? 'Bizimle İletişime Geçin' : language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'tr' ? 'Mesajınız Alındı!' : language === 'ar' ? 'تم استلام رسالتك!' : 'Message Received!'}
              </h3>
              <p className="text-slate-500 text-sm">
                {language === 'tr' 
                  ? 'En kısa sürede size geri dönüş yapacağız. Teşekkür ederiz.' 
                  : language === 'ar' 
                  ? 'سنعود إليك في أقرب وقت ممكن. شكراً لك.' 
                  : 'We will get back to you as soon as possible. Thank you.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'tr' ? 'Adınız Soyadınız' : language === 'ar' ? 'الاسم واللقب' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    placeholder={language === 'tr' ? 'Örn: Ahmet Yılmaz' : language === 'ar' ? 'مثل: أحمد يلماز' : 'e.g. John Doe'}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'tr' ? 'E-posta Adresiniz' : language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    placeholder="ornek@sirket.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'tr' ? 'Konu' : language === 'ar' ? 'الموضوع' : 'Subject'}
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    placeholder={language === 'tr' ? 'Hangi konuda yazıyorsunuz?' : language === 'ar' ? 'عن ماذا تكتب؟' : 'What is this about?'}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {language === 'tr' ? 'Mesajınız' : language === 'ar' ? 'رسالتك' : 'Message'}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
                  placeholder={language === 'tr' ? 'Sorularınızı veya düşüncelerinizi buraya yazın...' : language === 'ar' ? 'اكتب أسئلتك أو أفكارك هنا...' : 'Write your questions or thoughts here...'}
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all ${
                    isSubmitting
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-md'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {language === 'tr' ? 'Mesajı Gönder' : language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
