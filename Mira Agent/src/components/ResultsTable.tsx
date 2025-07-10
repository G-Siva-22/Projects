import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, FileText, Target, Zap, BookOpen, Loader2, AlertCircle, Tag } from 'lucide-react';
import { SearchResult } from '../types';
import { generateInstructions } from '../utils/groqApi';

interface ResultsTableProps {
  result: SearchResult | null;
  hasSearched: boolean;
  query: string;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ result, hasSearched, query }) => {
  const [instructions, setInstructions] = useState<string>('');
  const [isGeneratingInstructions, setIsGeneratingInstructions] = useState(false);
  const [instructionsError, setInstructionsError] = useState<string | null>(null);

  useEffect(() => {
    if (result && result.item) {
      generateAIInstructions();
    }
  }, [result]);

  const generateAIInstructions = async () => {
    if (!result?.item) return;

    setIsGeneratingInstructions(true);
    setInstructionsError(null);
    setInstructions('');

    try {
      const generatedInstructions = await generateInstructions(
        result.item.Description,
        result.item.Actions,
        result.item.Objects
      );
      setInstructions(generatedInstructions);
    } catch (error) {
      setInstructionsError(error instanceof Error ? error.message : 'Failed to generate instructions');
    } finally {
      setIsGeneratingInstructions(false);
    }
  };

  const getStepTypeColor = (stepType: string) => {
    const type = stepType.toLowerCase();
    switch (type) {
      case 'preparation':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'action':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'verification':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'safety':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'documentation':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'analysis':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatInstructions = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim());
    const formattedSteps: JSX.Element[] = [];
    let currentStep: string | null = null;
    let stepNumber = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.match(/^\d+\./)) {
        // This is a numbered step
        stepNumber++;
        currentStep = line.replace(/^\d+\.\s*/, '');
        
        // Look ahead for step type
        let stepType = 'General';
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('Step Type:')) {
          stepType = lines[i + 1].trim().replace('Step Type:', '').trim();
          i++; // Skip the step type line in next iteration
        }

        formattedSteps.push(
          <div key={stepNumber} className="mb-6 last:mb-0">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {stepNumber}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 leading-relaxed font-medium mb-2">
                  {currentStep}
                </p>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium border
                    ${getStepTypeColor(stepType)}
                  `}>
                    {stepType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return formattedSteps.length > 0 ? formattedSteps : (
      <p className="text-gray-700 leading-relaxed">{text}</p>
    );
  };

  if (!hasSearched) {
    return null;
  }

  if (!result) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No matching description found
            </h3>
            <p className="text-gray-600 mb-4">
              We couldn't find a close match for "{query}" in the CSV data.
            </p>
            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
              <p className="font-medium mb-2">Tips for better results:</p>
              <ul className="text-left space-y-1">
                <li>• Try using different keywords or phrases</li>
                <li>• Check for typos in your search query</li>
                <li>• Use more general terms if your search is too specific</li>
                <li>• Ensure your CSV contains relevant descriptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { item, score } = result;
  const confidenceScore = score ? Math.round((1 - score) * 100) : 100;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-6">
      {/* Match Confidence */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Match Found</h3>
          <div className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${confidenceScore >= 80 ? 'bg-green-100 text-green-800' : 
              confidenceScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'}
          `}>
            {confidenceScore}% confidence
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Your Search:</h4>
            <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">"{query}"</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Matched Description:</h4>
            <p className="text-gray-600 bg-green-50 p-3 rounded-lg">"{item.Description}"</p>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Task Details
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">Task</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.Task}</p>
              </div>
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">Actions</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.Actions}</p>
              </div>
            </div>
          </div>

          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">Objects</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.Objects}</p>
              </div>
            </div>
          </div>

          {/* AI Generated Instructions */}
          <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-t-2 border-orange-200">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    AI-Generated Step-by-Step Instructions
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                      Powered by Groq
                    </span>
                  </h4>
                  {!isGeneratingInstructions && !instructionsError && instructions && (
                    <button
                      onClick={generateAIInstructions}
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      Regenerate
                    </button>
                  )}
                </div>

                {isGeneratingInstructions && (
                  <div className="flex items-center gap-3 py-8">
                    <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
                    <div>
                      <p className="text-orange-700 font-medium">Generating instructions...</p>
                      <p className="text-sm text-orange-600">AI is analyzing the task details and creating step types</p>
                    </div>
                  </div>
                )}

                {instructionsError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-red-800 font-medium">Failed to generate instructions</p>
                        <p className="text-sm text-red-600 mt-1">{instructionsError}</p>
                        <button
                          onClick={generateAIInstructions}
                          className="mt-3 text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-lg transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {instructions && !isGeneratingInstructions && !instructionsError && (
                  <div className="bg-white rounded-lg p-6 border border-orange-200">
                    <div className="space-y-4">
                      {formatInstructions(instructions)}
                    </div>
                    
                    {/* Step Type Legend */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Step Type Legend:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
                          <span className="text-gray-600">Preparation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                          <span className="text-gray-600">Action</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-100 border border-purple-200 rounded"></div>
                          <span className="text-gray-600">Verification</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                          <span className="text-gray-600">Safety</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
                          <span className="text-gray-600">Documentation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-indigo-100 border border-indigo-200 rounded"></div>
                          <span className="text-gray-600">Analysis</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};