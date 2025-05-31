import CreatePollForm from './CreatePollForm';
import { WriteToContract } from '../common/contractOperations.ts';
import { useState } from 'react';

function CreatePollBtn() {

  const [showForm, setShowForm] = useState(false);

  const createNewPoll = () => {
    const {error, isPending} = WriteToContract('createNewPoll');
    if (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-transform"
      >
        Create Poll
      </button>
      <CreatePollForm show={showForm} />
    </div>
  );
}

export default CreatePollBtn;