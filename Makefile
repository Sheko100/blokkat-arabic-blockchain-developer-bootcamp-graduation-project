-include .env

test_deploy:
	forge create src/VotingSystem.sol:VotingSystem --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --constructor-args ${WEB3_ADDRESS}

deploy:
	forge create --broadcast src/VotingSystem.sol:VotingSystem --rpc-url ${RPC_URL} --private-key ${PRIVATE_KEY} --constructor-args ${WEB3_ADDRESS}
