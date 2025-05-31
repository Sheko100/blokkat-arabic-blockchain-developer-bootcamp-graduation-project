'use client'

import Account from './Account.tsx';
import PollsList from './PollsList.tsx';
import { useAppKitAccount } from '@reown/appkit/react';

function VotingSystem() {

  const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();

  {/*w-full h-full p-8 while connected*/}
  {/*w-80 h-64 p-6 while not connected*/}

  return (

  	<div className={`transition-all duration-700 ease-in-out ${isConnected ? 'w-full h-full p-8 opacity-100 scale-100' : 'w-80 h-64 p-6 items-center justify-center'} border border-gray-300 shadow-lg rounded-2xl flex flex-col`}>
  	<Account />
  	{ isConnected && <PollsList /> }
    </div>
  );

}


export default VotingSystem;