import Option from './Option.tsx';
import PollBar from './PollBar.tsx';
import ConfirmModal from './ConfirmModal.tsx';
import { wagmiContractConfig } from '../common/contracts';
import { useWriteContract } from 'wagmi';
import { readContract } from '@wagmi/core';
import { writeToContract } from '../common/contractOperations.ts';
import { useAppKitAccount, useAppKitBalance } from '@reown/appkit/react';
import { useState, useEffect } from "react";
import { config } from '../../config/index.tsx';
import toast from 'react-hot-toast';


function Poll({title, owner, id, votesCount, selectedOption, options, duration, onDeletion}) {

  const deadlineTimestamp = duration * 1000;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(selectedOption);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPollLocked, setIsPollLocked] = useState(false);
  const [pollStatus, setIsPollstatus] = useState(false);
  const [isPollEnded, setPollEnded] = useState(deadlineTimestamp <= Date.now());
  const { data: hash, error: writeError, isPending, writeContractAsync } = useWriteContract();
  const [optionObjs, setOptionObjs] = useState([]);
  const [topOption, setTopOption] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [walletPending, setWalletPending] = useState(false);
  const { address } = useAppKitAccount();
  const { fetchBalance } = useAppKitBalance();

  useEffect(() => {
    setIsPollLocked(selectedOptionId > 0);

    if (isPollEnded) {

      handlePollEnded();

      if (optionObjs.length > 0) {
        setTopOption(topVotesOption());
      }
      setIsPollstatus('ended');
    } else if (isPollLocked) {
      setIsPollstatus('locked');
    } else {
      setIsPollstatus('active');
    }

    document.body.style.overflow = showConfirm || showDeleteConfirm ? 'hidden' : 'auto';

  }, [selectedOptionId, isPollEnded, isPollLocked, showConfirm, showDeleteConfirm, optionObjs]);

  const optionSelectionHandler = (optionId) => {
    // should alert the user to confirm that the vote is final
    setShowConfirm(true);
    // should send a request to the contract to call the vote function

    setSelectedOptionId(optionId);
  }

  const voteConfirmHandler = async () => {
    try {

      setWalletPending(true);

      const etherAmount = '0.0000000005';

      const balance = await fetchBalance();

      if (Number(etherAmount) > Number(balance.data['balance'])) {
        throw new Error('Balance is insuffucient for this operation');
      }

      await writeToContract(writeContractAsync, 'vote', [id, selectedOptionId], etherAmount);

      setIsPollLocked(true);

      toast.success(`Vote has been registered successfuly`);

    } catch(error) {
      toast.error(`Failed to apply the vote: ${error.shortMessage || error.message}`);
      console.error('Failed to apply the vote', error.message);
      setIsPollLocked(false);
      setSelectedOptionId(0);
      setWalletPending(false);
    } finally {
      setShowConfirm(false);
      setWalletPending(false);
    }
  }

  const voteCancelHandler = () => {
    setShowConfirm(false);
    setSelectedOptionId(0);
  };

  const deletionHandler = () => {
    try {
      onDeletion(id);
      setWalletPending(true);
    } catch(error) {
      setShowDeleteConfirm(false);
      setWalletPending(false);
    } finally {
      setWalletPending(false);
    }
  };

  const deletionCancel = () => {
    setShowDeleteConfirm(false);
    setWalletPending(false);
  }

  const getOptionVotes = async () => {
    const count = await Promise.all(
          options.map((_, i) =>
            readContract(config, {
              ...wagmiContractConfig,
              functionName: 'getOptionVotes',
              args: [id, i + 1],
            })
          )
    );

    const optionVotesObjs = options.map((label, i) => ({
          label,
          id: i + 1,
          votesCount: Number(count[i] || 0),
    }));

    return optionVotesObjs;
  }

  const topVotesOption = () => {
    let topOptionObj = optionObjs[0];

    for (let i = 1; i < optionObjs.length; i++) {
      if (optionObjs[i].votesCount > topOptionObj.votesCount) {
        topOptionObj = optionObjs[i];
      }
    }

    return topOptionObj;
  }

  const handlePollEnded = async () => {
    const objs = await getOptionVotes();
    setOptionObjs(objs);
  }

  const renderedOptions = options.map((option, i) => {

    let optionVotes = 0;
    const optionId = i + 1;
    let showVotes = false;

    if (isPollEnded) {
      optionVotes = optionObjs[i] ? optionObjs[i].votesCount : 10;
      showVotes = true;

    }

    return (
      <Option 
        selected={optionId == selectedOptionId}
        key={optionId}
        id={optionId}
        label={option}
        onSelect={optionSelectionHandler}
        disabled={isPollLocked || isPollEnded}
        votesCount={optionVotes}
        showVotes={showVotes}
      />
    )

  });


  return (
    <div data-poll-id={id} className="bg-white border border-gray-200 rounded-xl shadow-md p-5 w-full mb-6 transition-all duration-300">
      <PollBar status={pollStatus} deadline={deadlineTimestamp} />
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none transition-transform"
          aria-label="Toggle Poll"
        >
            { isOpen ? '▲' : '▼' }
        </button>
      </div>

      <div
        className={`mt-4 transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="space-y-2">
          { renderedOptions }
        </div>

        {owner === address && ( <button
            onClick={() => setShowDeleteConfirm(true)}
            className="mt-4 self-end px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
          >
            Delete
          </button>
        )}
      </div>
      {isPollEnded && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded-xl shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide">Top Voted Option</p>
          <h4 className="text-lg font-bold mt-1">{topOption.label}</h4>
          <p className="text-sm text-gray-600">{topOption.votesCount} votes</p>
        </div>
      )}
        {showConfirm && <ConfirmModal message="Please, make sure before confirming that your vote is final" onConfirm={voteConfirmHandler} onCancel={voteCancelHandler} isPending={walletPending} />}
        {showDeleteConfirm && <ConfirmModal message="Are you sure you want to delete this poll?" onConfirm={deletionHandler} onCancel={deletionCancel} isPending={walletPending} />}
    </div>
  );
}

export default Poll;