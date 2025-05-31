'use client';

import React from 'react';

export default function ConfirmModal({message, onConfirm, onCancel, isPending=false}) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <p className="text-gray-800 mb-4 text-center">{message}</p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            disabled={isPending}
          >
            { isPending ? 'Waiting Wallet' : 'Confirm' }
          </button>
        </div>
      </div>
    </div>
  );
}