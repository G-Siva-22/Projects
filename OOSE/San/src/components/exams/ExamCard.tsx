import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, Award } from 'lucide-react';
import { Exam } from '../../types';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  // Function to get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cloud':
        return 'bg-blue-100 text-blue-800';
      case 'security':
        return 'bg-red-100 text-red-800';
      case 'networking':
        return 'bg-green-100 text-green-800';
      case 'programming':
        return 'bg-purple-100 text-purple-800';
      case 'data':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={exam.image} 
          alt={exam.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-0 right-0 mt-3 mr-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(exam.category)}`}>
            {exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {exam.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {exam.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(exam.difficulty)}`}>
            <Award className="h-3 w-3 mr-1" />
            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
          </span>
          
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock className="h-3 w-3 mr-1" />
            {exam.duration} min
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 flex items-center">
            <DollarSign className="h-5 w-5 text-gray-600" />
            {exam.price.toFixed(2)}
          </span>
          
          <Link 
            to={`/exams/${exam.id}`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;