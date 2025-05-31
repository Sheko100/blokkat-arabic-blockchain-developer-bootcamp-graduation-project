'use client'

import AccountInfo from './AccountInfo.tsx';
import { useAppKitAccount } from '@reown/appkit/react';
import { useState } from 'react';

function Account() {
  
  const { address, isConnected } = useAppKitAccount();

  return (
    <div className={isConnected ? 'fixed left-0 top-0 h-full w-1/4 max-w-xs bg-white border-r border-gray-200 p-4 shadow-md z-10' : ''}>
      { isConnected && <h2 className="text-lg font-semibold mb-4">Account Info</h2> }
      <appkit-button />
      { isConnected && <AccountInfo/> }
    </div>
  )
}

export default Account;