import CreatePoll from './CreatePoll.tsx';
import Poll from './Poll.tsx';
import { readFromContract, writeToContract } from '../common/contractOperations.ts';
import { useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';
import { useAppKitAccount, useAppKitBalance } from '@reown/appkit/react';
import toast from 'react-hot-toast';

/**
 * YOU WERE HERE
 * TODO:
 * - fix that deletion broke the voted mechanimsm DONE
 * - fix that deletion deleted wrong poll object DONE
 * - add a confirm modal to the deletion
 * - fix the styles of the overflow of the polls
 * - do the last styling touches
 * - add notification for the alerts or erros instead of logging it
 * - finish the readme
 * 
 * 
 */
function PollsList() {

  const [polls, setPolls] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [userVotes, setUserVotes] = useState([]);
  const [balance, setBalance] = useState();

  const {data: pollsData, isError: activePollsError, refetch: refetchPolls} = readFromContract('getActivePolls');
  // all polls count not only the active ones
  const {data: lastIdData, isError: PollsCountError, refetch: refetchCount} = readFromContract('allPollsCount');

  // should first check a local boolean that the user has voted before sending this request
  const {data: userVotesData, isError: userVotesError, refetch: refetchUserVotes} = readFromContract('getUserVotes');

  const { data: hash, error: writeError, isPending, writeContractAsync } = useWriteContract();

  const { fetchBalance } = useAppKitBalance();


  useEffect(() => {

    if (pollsData) {
      setPolls(pollsData);
    }

    if (lastIdData && lastIdData > 0) {
      setLastId(lastIdData);
    }

    if (userVotesData && userVotesData.length > 0) {
      setUserVotes(userVotesData);
    }

  }, [pollsData, lastIdData, userVotesData, fetchBalance]);

  const handleNewPoll = (newPoll) => {
    setPolls((prev) => [...prev, newPoll]);
    setLastId(newPoll.id);
  };

  const handleDeletePoll = async (pollId) => {
    // delete the poll from the chain

    try {
      const etherAmount = '0.000000001';

      const balance = await fetchBalance();

      if (Number(etherAmount) > Number(balance.data['balance'])) {
        throw new Error('Balance is insuffucient for this operation');
      }

      await writeToContract(writeContractAsync, 'deletePoll', [pollId], etherAmount);

      setPolls((prev) => prev.filter(poll => poll.id !== pollId));

      toast.success(`Poll has been deleted successfully`);
    } catch(error) {
      toast.error(`Failed to delete poll: ${error.shortMessage || error.message}`);
      console.error("Poll Deletion Error:", error.message);
    }
  }

  const renderedPolls = polls.map((poll) => {
    let selectedOptionId = 0;

    userVotes.forEach((vote) => {
      if (vote[0] === poll.id) {

        selectedOptionId = vote[1];
      }
    });

    return (
      <Poll
        key={poll.id}
        id={poll.id}
        owner={poll.owner}
        title={poll.title}
        options={poll.options}
        selectedOption={selectedOptionId}
        votesCount={poll.votesCount}
        duration={poll.endTime}
        onDeletion={handleDeletePoll}
      />
    );
  });


  return (
    <div className="ml-[25%] p-8">
      <CreatePoll onCreatePoll={handleNewPoll} pollLastId={lastId} />
      <div>{renderedPolls}</div>
    </div>
  )
}

export default PollsList;