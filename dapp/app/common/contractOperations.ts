import { useReadContract, useWriteContract } from 'wagmi';
import { wagmiContractConfig } from './contracts';
import { useAppKitAccount } from '@reown/appkit/react';

function readFromContract(functionName, args=[]) {
  const { address } = useAppKitAccount();
  const response = useReadContract({
    ...wagmiContractConfig,
    functionName: functionName,
    args: args,
    account: address,
  });

  return response;
}

async function writeToContract(contractWrite, functionName, args=[]) {
  await contractWrite({
  	...wagmiContractConfig,
  	functionName: functionName,
  	args: args,
  });
}

export { readFromContract, writeToContract };