import Image from 'next/image';
import VotingSystem from './components/VotingSystem.tsx';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <>
      <Toaster/>
      <VotingSystem />
    </>
  );
}

/**
 * Components Tree Structure
 * 
 *                                                  Home
                                                     ||
                                               ------  -------------------------
                                               |                               |
                                           Polls List                      AUTH component
                                               |                                |
                                  ------------- --------               --------- --------------
                                  |                |                   |                      |
                            Create Poll button  Poll component    user info card        appkit-button
                                                     |
                                                 ------ -----------------
                                                 |                      |
 *                                        a poll title or question   multiple option components
 */

/**
 * App flow
 * 
 * Connect wallet is the first gate to show
 * 
 * after connecting, fetching data should begin
 * 
 * ---- reading the data from the server and reflect on the UI ----
 * 
 * FETCH (getActivepolls) the polls array which will have info about the poll id, votes count, poll owner address, and the poll options
 * 
 * poll id should be written to the Poll component
 * poll options should be passed to the Poll component and written in the Option component
 * 
 * FETCH (getUserVotes) a map to which poll and which option the user has voted for (array of arrays)
 * 
 * The voted option should be reflected in the Poll component
 * 
 * 
 * ---- Reading the data from the UI and writing to the Contract ----
 * 
 * ALL will have be reflected to UI only once the response is success
 * 
 * VOTING: (vote) either the Option component send the request or emit that to the Parent Poll component
 * 
 * POLL CREATION: (createNewPoll) when submits the request sent to the contract
 *  will add a new poll to the UI when there is no error from the request to the contract
 * 
 * POLL DELETION: (deletePoll) a request sent to the contract to delete the POLL
 * 
 * 
 * 
 * 
 * 
 * Hooks for things that change in the app like:
 * - poll voted option
 * - account conncetion state and what to render based on that
 * 
 * The state of the poll voted option should belong to the Poll component
 * 
 * IMPORTANT NOTES:
 * - it might be that fetching the data from the contract will be better in the server side
 * 
 * REACT restrictions:
 * - state can be only modified in the component that has the hook of the state
 * 
 * NEXT restrictions:
 * - useState should be used in a file that expliclity defined as client
 * - the default of the files type is server
 * 
 */
