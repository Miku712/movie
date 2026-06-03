import { useState, useEffect } from 'react';
import { validateEmail } from '../utils/helpers';

export default function Contacts() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const newErrors = { name: '', email: '', message: '' };
    let valid = true;

    if (name.trim().length === 0 && name !== '') {
      newErrors.name = 'Ім\'я не може бути порожнім';
      valid = false;
    } else if (!name) { valid = false; }

    if (email && !validateEmail(email)) {
      newErrors.email = 'Невірний формат email';
      valid = false;
    } else if (!email) { valid = false; }

    if (message && message.length < 10) {
      newErrors.message = 'Повідомлення має містити мінімум 10 символів';
      valid = false;
    } else if (!message) { valid = false; }

    setErrors(newErrors);
    setIsFormValid(valid);
  }, [name, email, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    // Імітація запиту
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Сховати повідомлення про успіх через 5 секунд
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Контакти</h1>
      
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">Ваше повідомлення успішно відправлено!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ім'я
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            }`}
            placeholder="Введіть ваше ім'я"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Повідомлення
          </label>
          <textarea
            id="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 resize-none ${
              errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'
            }`}
            placeholder="Ваше повідомлення (мінімум 10 символів)"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Відправка...' : 'Відправити'}
        </button>
      </form>
    </div>
  );
}
