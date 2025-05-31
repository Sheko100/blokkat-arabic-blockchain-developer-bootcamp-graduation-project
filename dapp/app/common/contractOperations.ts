import { useReadContract, useWriteContract } from 'wagmi';
import { type Abi } from 'viem';
import { wagmiContractConfig } from './contracts';
import { useAppKitAccount } from '@reown/appkit/react';

type AbiFunction = Extract<(typeof wagmiContractConfig.abi)[number], { type: 'function' }>;

type ReadOnlyAbiFunction = Extract<AbiFunction, { stateMutability: 'view' | 'pure' }>;

type ContractReadFunctionName = ReadOnlyAbiFunction['name'];

type WriteOnlyAbiFunction = Extract<AbiFunction, { stateMutability: 'nonpayable' | 'payable' }>;

type ContractWriteFunctionName = WriteOnlyAbiFunction['name'];

function readFromContract(functionName: ContractReadFunctionName , args: readonly any[] = []) {
  const { address } = useAppKitAccount();
  const response = useReadContract({
    ...wagmiContractConfig,
    functionName: functionName,
    args: args as unknown as any[],
    account: address as `0x${string}`,
  });

  return response;
}

async function writeToContract(contractWrite, functionName: ContractWriteFunctionName , args: readonly any[] = []) {
  await contractWrite({
  	...wagmiContractConfig,
  	functionName: functionName,
  	args: args as unknown as any[],
  });
}

export { readFromContract, writeToContract };