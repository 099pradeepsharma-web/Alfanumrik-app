
import React, { useState, useCallback, useEffect } from 'react';
import { generateEQScenario } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { LightBulbIcon } from '@heroicons/react/24/outline';

interface EQModuleProps {
    onBack: () => void;
}

const EQModule: React.FC<EQModuleProps> = ({ onBack }) => {
    const [scenario, setScenario] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState('');
    const [feedback, setFeedback] = useState<string | null>(null);

    const fetchScenario = useCallback(async () => {
        setLoading(true);
        setResponse('');
        setFeedback(null);
        const newScenario = await generateEQScenario();
        setScenario(newScenario);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchScenario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <button onClick={onBack} className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 font-semibold mb-6">
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back to Dashboard</span>
            </button>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                    <SparklesIcon className="h-8 w-8 text-teal-500" />
                    <h1 className="text-2xl font-bold text-slate-800">Emotional Intelligence Training</h1>
                </div>
                <p className="text-slate-600 mb-6">Read the scenario and think about how you would respond. This helps build empathy, problem-solving, and self-awareness.</p>
                
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 min-h-[150px] flex items-center justify-center">
                    {loading ? <LoadingSpinner /> : (
                        <p className="text-lg text-slate-700 italic text-center">"{scenario}"</p>
                    )}
                </div>

                <div className="mt-6">
                    <label htmlFor="response" className="block text-md font-semibold text-slate-700 mb-2">Your Response:</label>
                    <textarea
                        id="response"
                        rows={4}
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="How would you handle this situation?"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                </div>
                
                <div className="flex justify-between items-center mt-6">
                    <button onClick={fetchScenario} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors">
                        New Scenario
                    </button>
                    <button disabled={!response} className="bg-teal-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-slate-400">
                        Submit for Feedback (Coming Soon)
                    </button>
                </div>

                {feedback && (
                     <div className="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                        <div className="flex items-center space-x-2">
                             <LightBulbIcon className="h-6 w-6 text-indigo-600"/>
                             <h4 className="font-bold text-indigo-800">AI Feedback</h4>
                        </div>
                        <p className="text-indigo-700 mt-2">{feedback}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EQModule;
