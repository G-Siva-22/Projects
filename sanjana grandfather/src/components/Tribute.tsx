import React, { useState } from 'react';
import { Send, Heart } from 'lucide-react';

const Tribute: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    relationship: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tribute submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="tribute" className="min-h-screen bg-cream flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 fade-in">
        <h3 className="text-2xl font-bold text-charcoal mb-6 flex items-center justify-center">
          <Heart className="text-burgundy mr-3" size={28} />
          Leave a Tribute
        </h3>

        {isSubmitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-green-600" size={32} />
            </div>
            <h4 className="text-xl font-bold text-charcoal mb-2">Thank You!</h4>
            <p className="text-charcoal/70">
              Your tribute has been submitted and will help preserve his memory.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="relationship" className="block text-sm font-semibold text-charcoal mb-2">
                Your Connection
              </label>
              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
              >
                <option value="">Select your connection...</option>
                <option value="family">Family Member</option>
                <option value="student">Art Student</option>
                <option value="colleague">Colleague</option>
                <option value="admirer">Art Admirer</option>
                <option value="visitor">Museum/Gallery Visitor</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Share your thoughts, memories, or how his art has impacted you..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <Send className="mr-2" size={20} />
              Submit Tribute
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Tribute;
