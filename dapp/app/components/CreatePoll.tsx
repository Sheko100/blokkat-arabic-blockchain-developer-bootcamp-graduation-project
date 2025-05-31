'use client'

import { useState, useEffect } from 'react';
import { useWriteContract } from 'wagmi';
import { writeToContract } from '../common/contractOperations.ts';
import { useAppKitAccount } from '@reown/appkit/react';
import toast from 'react-hot-toast';

export default function CreatePoll({ onCreatePoll, pollLastId}) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState('');
  const [pendingWallet, setPendingWallet] = useState(false);
  const { address } = useAppKitAccount();
  const { data: hash, error: writeError, isPending, writeContractAsync } = useWriteContract();

  useEffect(() => {
    // Lock scroll when modal is open
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const deadlineInSeconds = (secondsToAdd) => {
    const nowInSeconds = Date.now() / 1000;

    return secondsToAdd + nowInSeconds;
  }

  const closeModal = () => {
    setShowModal(false);
    setTitle('');
    setOptions(['', '']);
    setDuration('');
  };

  const confirmPoll = async () => {
    const numberOfDays= parseInt(duration, 10);
    if (isNaN(numberOfDays) || numberOfDays <= 0) {
      alert('Please enter a valid duration.');
      return;
    }

    try {

      setPendingWallet(true);
      const args = [title, options, numberOfDays];
      // add poll on contract
      await writeToContract(writeContractAsync, 'createNewPoll', args);

      const durationInSeconds = numberOfDays * 60 * 60 * 24;

      const newPoll = {
        id: pollLastId + 1,
        owner: address,
        votesCount: 0,
        title,
        options,
        endTime: deadlineInSeconds(durationInSeconds),
      };

      onCreatePoll(newPoll);

      toast.success(`Poll has been created successfully`);

    } catch(error) {
      toast.error(`Failed to create the poll: ${error.shortMessage}`);
      console.error("Poll Creation Error:", error.message);
    } finally {
      setPendingWallet(false);
      closeModal();
    }

  };


  return (
    <>
    <div>
      <button
        className="px-6 py-2 mb-5 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        onClick={() => setShowModal(true)}
      >
        Create Poll
      </button>
    </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-6 relative animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
              title="Close"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">Create a New Poll</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium">Poll Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="e.g., What's your favorite framework?"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Options</label>
                <div className="space-y-2">
                  {options.map((opt, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 p-2 border rounded-lg"
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => removeOption(index)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove option"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addOption}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    + Add Option
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium">Poll Duration (days)</label>
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="e.g., 3"
                />
              </div>

              <div className="text-right pt-4">
                <button
                  onClick={confirmPoll}
                  disabled={
                    !title.trim() ||
                    options.some((o) => !o.trim()) ||
                    !duration.trim() ||
                    parseInt(duration, 10) <= 0 ||
                    pendingWallet
                  }
                  className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                >
                 { pendingWallet ? 'Waiting wallet' : 'Confirm Poll' }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
