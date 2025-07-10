import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useExams } from '../context/ExamContext';
import { Search, Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import ExamCard from '../components/exams/ExamCard';
import Button from '../components/common/Button';

const ExamCatalogPage: React.FC = () => {
  const { exams, filteredExams, filterExams, isLoading } = useExams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter categories
  const categories = ['all', ...new Set(exams.map(exam => exam.category))];
  
  // Apply filters when search term or category changes
  useEffect(() => {
    filterExams(searchTerm, selectedCategory === 'all' ? undefined : selectedCategory);
  }, [searchTerm, selectedCategory, filterExams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Browse Certification Exams</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find the perfect certification exam to advance your career and professional development
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md mb-10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            {/* Mobile Filter Toggle */}
            <div className="md:hidden">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full justify-between"
                icon={<SlidersHorizontal className="h-5 w-5" />}
              >
                Filters
                <ChevronDown className={`h-5 w-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {/* Desktop Category Filter */}
            <div className="hidden md:block relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mt-4 border-t pt-4">
              <div className="mb-4">
                <label htmlFor="mobile-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="mobile-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Results Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredExams.length} {filteredExams.length === 1 ? 'Exam' : 'Exams'} Found
          </h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredExams.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExams.map(exam => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600 mb-4">No exams match your search criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* CTA Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-6 md:p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Don't see the exam you're looking for?</h3>
        <p className="text-gray-600 mb-6">
          Contact our team to request additional certification exams or for more information.
        </p>
        <Link to="/contact">
          <Button variant="primary">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ExamCatalogPage;