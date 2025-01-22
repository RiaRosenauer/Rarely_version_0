"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Activity, X, MessageCircle, Database } from "lucide-react";

const RarelyWrapped = ({ onClose }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const wrapperPages = [
    {
      content: (
        <div className="flex flex-col items-center px-5 py-6 bg-white rounded-3xl relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
          
          <Activity className="w-10 h-10 text-blue-500 mb-3" />
          <h2 className="text-2xl font-bold mb-6 text-center">Your Health Journal</h2>
          
          <div className="flex justify-center items-start gap-8 mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-500">365</p>
              <p className="text-sm text-gray-600 mt-1">Medication<br />Logs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-500">180</p>
              <p className="text-sm text-gray-600 mt-1">Activity<br />Entries</p>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-yellow-500">21</p>
            <p className="text-sm text-gray-600 mt-1">Day Streak</p>
          </div>

          <p className="text-lg font-semibold mb-4 text-center">
            You've made 545 total entries this year!
          </p>

          <div className="bg-blue-50 p-3 rounded-xl w-full">
            <p className="text-blue-700 text-sm text-center">
              Your consistent participation helps build the dataset needed for breakthrough research.
            </p>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-col items-center px-5 py-6 bg-white rounded-3xl relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
          
          <MessageCircle className="w-10 h-10 text-green-500 mb-3" />
          <h2 className="text-2xl font-bold mb-6 text-center">Your Community Impact</h2>
          
          <div className="flex justify-center items-start gap-8 mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-500">42</p>
              <p className="text-sm text-gray-600 mt-1">Questions<br />Answered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-500">5</p>
              <p className="text-sm text-gray-600 mt-1">Topics<br />Created</p>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-purple-500">78</p>
            <p className="text-sm text-gray-600 mt-1">People Thanked You</p>
          </div>

          <div className="bg-green-50 p-3 rounded-xl w-full">
            <p className="text-green-700 text-sm text-center">
              When we share our experiences, we strengthen the rare disease community together.
            </p>
          </div>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-col items-center px-5 py-6 bg-white rounded-3xl relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
          
          <Database className="w-10 h-10 text-purple-500 mb-3" />
          <h2 className="text-2xl font-bold mb-6 text-center">Your Research Impact</h2>
          
          <div className="flex justify-center items-start gap-8 mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-500">1635</p>
              <p className="text-sm text-gray-600 mt-1">Data Points<br />Contributed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-500">3</p>
              <p className="text-sm text-gray-600 mt-1">Studies<br />Supported</p>
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-xl w-full">
            <p className="text-purple-700 text-sm text-center">
              Your data is instrumental in advancing rare heart disease research.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col items-center pt-12">
      <div className="relative w-full max-w-xs mx-auto">
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 100 : -100, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 500, damping: 40 },
                opacity: { duration: 0.1 },
                duration: 0.15
              }}
            >
              {wrapperPages[page].content}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-3">
          <button
            onClick={() => setPage([page - 1, -1])}
            disabled={page === 0}
            className="flex items-center gap-1 px-4 py-2 bg-gray-100/80 backdrop-blur-sm rounded-full disabled:opacity-50 text-sm font-medium text-gray-700 hover:bg-gray-200/80 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            onClick={() => setPage([page + 1, 1])}
            disabled={page === wrapperPages.length - 1}
            className="flex items-center gap-1 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full disabled:opacity-50 text-sm font-medium text-gray-700 hover:bg-gray-50/80 transition-colors shadow-sm"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RarelyWrapped; 