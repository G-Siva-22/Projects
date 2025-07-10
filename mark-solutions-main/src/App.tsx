import React, { useEffect, useState, useRef } from 'react';
import { Phone, MapPin, Mail, Star, Clock, CheckCircle, PenTool as Tool, Laptop, Monitor, HardDrive, Cpu, Battery, Award, ChevronRight, Facebook, Twitter, Instagram, ArrowRight, Wrench, Shield, Zap, ChevronLeft } from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Motherboard Repair",
      description: "Expert chip-level repairs for all laptop motherboard issues including BGA rework and component replacement.",
      icon: <Tool className="text-red-600 group-hover:text-white transition" size={32} />,
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      color: "red"
    },
    {
      title: "Screen Replacement",
      description: "Quick and professional replacement for cracked, broken or dim laptop screens with genuine parts.",
      icon: <Monitor className="text-red-600 group-hover:text-white transition" size={32} />,
      image: "https://images.unsplash.com/photo-1563838969-0a92523228af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      color: "red"
    },
    {
      title: "Data Recovery",
      description: "Secure and reliable data recovery services for all types of storage devices with confidentiality guaranteed.",
      icon: <HardDrive className="text-red-600 group-hover:text-white transition" size={32} />,
      image: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      color: "red"
    },
    {
      title: "Broken Laptop Repair",
      description: "Complete restoration of physically damaged laptops including hinge repairs and case replacements.",
      icon: <Laptop className="text-red-600 group-hover:text-white transition" size={32} />,
      image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      color: "red"
    },
    {
      title: "Hardware Upgrades",
      description: "Performance boosting upgrades including RAM, SSD, and processor enhancements for faster computing.",
      icon: <Cpu className="text-red-600 group-hover:text-white transition" size={32} />,
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      color: "red"
    },
    {
      title: "Battery Replacement",
      description: "Original and compatible battery replacements for all laptop brands with warranty and proper disposal of old batteries.",
      icon: <Battery className="text-red-600 group-hover:text-white transition" size={32} />,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      color: "red"
    }
  ];

  const brands = [
    { 
      name: 'Dell', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1024px-Dell_Logo.svg.png',
      specialty: 'Precision & XPS Experts'
    },
    { 
      name: 'HP', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png',
      specialty: 'Spectre & Envy Specialists'
    },
    { 
      name: 'Lenovo', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/1280px-Lenovo_logo_2015.svg.png',
      specialty: 'ThinkPad Repair Experts'
    },
    { 
      name: 'Apple', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png',
      specialty: 'MacBook Logic Board Repair'
    },
    { 
      name: 'Acer', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/1280px-Acer_2011.svg.png',
      specialty: 'Predator Gaming Repairs'
    },
    { 
      name: 'Asus', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/1280px-ASUS_Logo.svg.png',
      specialty: 'ROG & ZenBook Experts'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">Keelkattalai, Chennai</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <span className="text-sm">+91 72 999 444 04</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span className="text-sm">support@marksolutions.co.in</span>
            </div>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-sm hover:text-red-200 transition">FAQ</a>
            <a href="#" className="text-sm hover:text-red-200 transition">Help Desk</a>
            <a href="#" className="text-sm hover:text-red-200 transition">Live Location</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-2xl font-bold">
              <img src="https://marksolutions-in.web.app/img/logo1.png" alt="MARK Solutions" className="h-16" />
            </div>
            </div>
<nav className="flex flex-wrap justify-center gap-6">
      <a href="#" className="font-medium text-red-900 hover:text-red-600 transition border-b-2 border-transparent hover:border-red-600">
        Home
      </a>

      <div className="relative group">
        <a href="#" className="font-medium text-gray-700 hover:text-red-600 transition border-b-2 border-transparent hover:border-red-600">
          Services
        </a>
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Dell Laptop Service</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-100">HP Laptop Service</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Lenovo Laptop Service</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Acer Laptop Service</a>
          <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Apple Laptop Service</a>
        </div>
      </div>

      <div className="relative group">
        <a href="#" className="font-medium text-gray-700 hover:text-red-600 transition border-b-2 border-transparent hover:border-red-600">
          Laptop Spares
        </a>

        <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <div className="relative group/nested">
            <a href="laptop-adapter-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">
              Laptop Adapter
            </a>

            <div className="absolute left-full top-0 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all z-30">
              <a href="dell-laptop-adapter-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Dell Laptop Adapter</a>
              <a href="hp-laptop-adapter-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">HP Laptop Adapter</a>
              <a href="lenovo-laptop-adapter-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Lenovo Laptop Adapter</a>
              <a href="acer-laptop-adapter-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Acer Laptop Adapter</a>
              <a href="apple-laptop-adapter-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Apple Laptop Adapter</a>
              <a href="sony-laptop-adapter-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Sony Laptop Adapter</a>
            </div>
          </div>

          <div className="relative group/nested">
            <a href="laptop-battery-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">
              Laptop Battery
            </a>

            <div className="absolute left-full top-0 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all z-30">
              <a href="dell-laptop-battery-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Dell Laptop Battery</a>
              <a href="hp-laptop-battery-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">HP Laptop Battery</a>
              <a href="lenovo-laptop-battery-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Lenovo Laptop Battery</a>
              <a href="acer-laptop-battery-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Acer Laptop Battery</a>
              <a href="apple-laptop-battery-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Apple Laptop Battery</a>
              <a href="sony-laptop-battery-price-in-chennai.html" className="block px-4 py-2 text-gray-700 hover:bg-red-100">Sony Laptop Battery</a>
            </div>
          </div>
        </div>
      </div>

      <a href="https://marksolutions-in.web.app/a-to-z-computer-accessories.html" className="font-medium text-gray-700 hover:text-red-600 transition border-b-2 border-transparent hover:border-red-600">
        Accessories
      </a>
      <a href="#" className="font-medium text-gray-700 hover:text-red-600 transition border-b-2 border-transparent hover:border-red-600">
        Warranty
      </a>
      <a href="#" className="font-medium text-gray-700 hover:text-red-600 transition border-b-2 border-transparent hover:border-red-600">
        Contact
      </a>
    </nav></div>








      </header>

      {/* Hero Section with New Image */}
      <section className="relative overflow-hidden bg-gray-900">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-white order-2 md:order-1">
              <div className="inline-block bg-red-600 px-3 py-1 text-sm font-semibold rounded-full animate-pulse">
                #1 Laptop Service in Chennai
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Expert Laptop Repair Services in Keelkattalai
              </h1>
              <p className="text-xl opacity-90">
                Professional laptop repair with quick turnaround time and affordable pricing. We fix all brands including Dell, HP, Lenovo, Apple, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="group bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Book a Repair
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a href="#" className="bg-transparent border-2 border-white hover:bg-white hover:text-red-800 px-6 py-3 rounded-lg font-medium transition">
                  Contact Us
                </a>
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#FFC107" color="#FFC107" />
                  ))}
                </div>
                <span className="text-sm">Rated 4.9/5 based on 250+ reviews</span>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="relative z-10 transform transition-all duration-500 hover:scale-105 hover:rotate-2">
                <img 
                  src="https://marksolutions.co.in/img/laptopservicecenterintambaram1.png" 
                  alt="Laptop Repair Service" 
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                  <div className="flex items-center">
                    <Clock size={24} className="mr-2" />
                    <div>
                      <p className="text-sm font-medium">Quick Service</p>
                      <p className="text-xs">Most repairs in 24-48 hours</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                  <div className="flex items-center">
                    <CheckCircle size={24} className="mr-2" />
                    <div>
                      <p className="text-sm font-medium">Warranty</p>
                      <p className="text-xs">Up to 6 months on repairs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Brands Ticker */}
      <div className="py-6 bg-gray-100 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-16 mx-8">
              {['Dell', 'HP', 'Lenovo', 'Apple', 'Acer', 'Asus', 'MSI', 'Toshiba'].map((brand, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-lg font-bold text-gray-700">{brand}</span>
                  <span className="mx-2 text-red-600">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Services Section with Parallax and Carousel */}
      <section ref={servicesRef} className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
            transform: `translateY(${(scrollY - 600) * 0.2}px)`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">OUR EXPERTISE</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Expert Services</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive laptop repair services with skilled technicians who can fix any issue with your device.
            </p>
          </div>
          
          {/* Services Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {services.map((service, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition">
                          {service.icon}
                        </div>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <a href="#" className="inline-flex items-center text-red-600 font-medium hover:text-red-800 group">
                          Learn more <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition z-10 md:translate-x-0"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition z-10 md:translate-x-0"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? 'bg-red-600 w-6' : 'bg-gray-300'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-red-700 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
            transform: `translateY(${(scrollY - 1200) * 0.1}px)`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-lg opacity-80">Repairs Completed</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg opacity-80">Customer Satisfaction</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-80">Years Experience</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-80">Technical Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Parallax */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
            transform: `translateY(${(scrollY - 1800) * 0.15}px)`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">WHY CHOOSE US</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose MARK Solutions</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We pride ourselves on providing exceptional laptop repair services with a focus on quality, speed, and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Wrench className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Expert Technicians</h3>
              </div>
              <p className="text-gray-600">Our team consists of certified professionals with years of experience in laptop repairs for all major brands.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Clock className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Quick Turnaround</h3>
              </div>
              <p className="text-gray-600">Most repairs are completed within 24-48 hours to minimize your downtime and get you back to work quickly.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Genuine Parts</h3>
              </div>
              <p className="text-gray-600">We use only original or high-quality compatible parts for all repairs to ensure long-lasting performance.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Zap className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Free Diagnostics</h3>
              </div>
              <p className="text-gray-600">We provide free testing and diagnostics to accurately identify your laptop issues before beginning any repair work.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Award className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Warranty</h3>
              </div>
              <p className="text-gray-600">All our repairs come with a warranty for your peace of mind, ensuring quality and reliability in our service.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border-t-4 border-red-600">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Pickup & Delivery</h3>
              </div>
              <p className="text-gray-600">Convenient pickup and delivery services available in Keelkattalai and surrounding areas for your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Brands Section */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">BRANDS WE SERVICE</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Brands We Service</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We specialize in repairing all major laptop brands with expertise in each manufacturer's unique specifications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 group"
              >
                <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-90"></div>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="h-16 object-contain relative z-10 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">{brand.name}</h3>
                  <p className="text-gray-600">{brand.specialty}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a href="#" className="inline-flex items-center text-red-600 font-medium hover:text-red-800 group">
                      View services <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Parallax */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
            transform: `translateY(${(scrollY - 2400) * 0.15}px)`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Customer Testimonials</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative">
              <div className="absolute top-0 right-0 -mt-5 -mr-5 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                "
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFC107" color="#FFC107" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "A perfect place to FIX your Laptop for hardware and software problems. We have repaired our HP laptop and it's working good. Excellent place and with reasonable charges. Mr.Rajesh is very knowledgeable and highly experienced, a good consultant for your Laptop issues."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 text-red-600 font-bold">
                  RS
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ramesh S.</h4>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative">
              <div className="absolute top-0 right-0 -mt-5 -mr-5 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                "
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFC107" color="#FFC107" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The endless support and positivity which I received from Mark Solutions. I would like to thank Mark Solutions for assisting me to buy right product with unmatched cost in the Market. Any kind of IT support and other computer peripherals go with Mark Solutions without any doubt."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 text-red-600 font-bold">
                  PK
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Priya K.</h4>
                  <p className="text-sm text-gray-500">5 days ago</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative">
              <div className="absolute top-0 right-0 -mt-5 -mr-5 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                "
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFC107" color="#FFC107" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Great place for all laptop needs, Bought a laptop for online classes for my kid from here and it's very good. Owner is very friendly and recommend best for the customers. I would highly recommend this place."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 text-red-600 font-bold">
                  VR
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Vijay R.</h4>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center text-red-600 font-medium hover:text-red-800 group">
              View all reviews <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our laptop repair services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-red-600">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Do you sell all model laptop spare parts and accessories?</h3>
              <p className="text-gray-600">Yes, we sell all model laptop spare parts and accessories with direct manufacturer warranty. We stock a wide range of components for all major brands.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-red-600">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">How do you fix crashed laptop screen/display?</h3>
              <p className="text-gray-600">We have many screen/display options in stock for all laptop models. We can replace your crashed LCD/LED screen/display with a new one, usually within 24 hours.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-red-600">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Is doorstep delivery available?</h3>
              <p className="text-gray-600">Yes, we provide doorstep pickup and delivery around the Keelkattalai location. Our technicians can also perform some repairs at your location if needed.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border-l-4 border-red-600">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Do you sell laptops and what is the price range?</h3>
              <p className="text-gray-600">We sell all models of refurbished laptops at our service center. You can get high-quality working condition laptops at a low budget with warranty. We also provide 1 month of free general service.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <a href="#" className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition shadow-md hover:shadow-lg">
              View more FAQs
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section with Parallax */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
            transform: `translateY(${(scrollY - 3000) * 0.15}px)`
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-3">CONTACT US</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Visit our service center or get in touch with us for the best laptop repair solutions in Keelkattalai, Chennai.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <MapPin className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">Our Location</h3>
                      <p className="text-gray-600">
                        #29, Sarojammal Complex, Medavakkam Main Rd, Keelkattalai, Chennai, Tamil Nadu - 600117
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Phone className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600">+91 72 999 444 04</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Mail className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">support@marksolutions.co.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Clock className="text-red-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">Working Hours</h3>
                      <p className="text-gray-600">Monday - Sunday: 7:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition transform hover:scale-110">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition transform hover:scale-110">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition transform hover:scale-110">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">Send Us a Message</h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                  <select
                    id="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  >
                    <option value="">Select a service </option>
                    <option value="motherboard">Motherboard Repair</option>
                    <option value="screen">Screen Replacement</option>
                    <option value="data">Data Recovery</option>
                    <option value="broken">Broken Laptop Repair</option>
                    <option value="upgrade">Hardware Upgrades</option>
                    <option value="battery">Battery Replacement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    placeholder="Describe your laptop issue..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2474865392055!2d80.18487541482182!3d12.956009190866093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f3aef193475%3A0x5357a18d1566c766!2sMARK%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1632078713533!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="MARK Solutions Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-900 to-red-700 text-white pt-16 pb-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')"
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-6 border-b border-red-800 pb-2">About MARK Solutions</h3>
              <p className="text-red-100 mb-4">
                MARK Solutions is a leading laptop repair center in Keelkattalai, Chennai. We provide expert repair services for all laptop brands with quick turnaround time and affordable pricing.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-red-100 hover:text-white transition">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-red-100 hover:text-white transition">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-red-100 hover:text-white transition">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 border-b border-red-800 pb-2">Our Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Motherboard Repair</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Screen Replacement</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Data Recovery</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Broken Laptop Repair</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Hardware Upgrades</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Battery Replacement</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 border-b border-red-800 pb-2">Brands We Service</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Dell Laptop Service</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> HP Laptop Service</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Lenovo Laptop Service</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Apple Laptop Service</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Acer Laptop Service</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition flex items-center"><ChevronRight size={16} className="mr-2" /> Asus Laptop Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 border-b border-red-800 pb-2">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin size={20} className="mr-3 mt-1 flex-shrink-0 text-red-400" />
                  <span>#29, Sarojammal Complex, Medavakkam Main Rd, Keelkattalai, Chennai, Tamil Nadu - 600117</span>
                </li>
                <li className="flex items-center">
                  <Phone size={20} className="mr-3 flex-shrink-0 text-red-400" />
                  <span>+91 72 999 444 04</span>
                </li>
                <li className="flex items-center">
                  <Mail size={20} className="mr-3 flex-shrink-0 text-red-400" />
                  <span>support@marksolutions.co.in</span>
                </li>
                <li className="flex items-center">
                  <Clock size={20} className="mr-3 flex-shrink-0 text-red-400" />
                  <span>Mon-Sun: 7:00 AM - 11:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-red-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-red-100 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} MARK Solutions. All Rights Reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-red-100 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="text-red-100 hover:text-white transition">Terms of Service</a>
                <a href="#" className="text-red-100 hover:text-white transition">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="tel:+917299944404" 
          className="flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition transform hover:scale-105"
        >
          <Phone size={20} className="mr-2" />
          <span className="font-medium">Call Now</span>
        </a>
      </div>
    </div>
  );
}

export default App;