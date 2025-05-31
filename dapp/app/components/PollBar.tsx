export default function PollBar({status='active', deadline}) {

  return (
	<div className="mb-5 flex items-center justify-between text-sm text-gray-600">
		  {status !== 'ended' && (
		  <div className="text-s text-gray-500">
		  Voting ends: <span className="font-medium">{new Date(deadline).toLocaleString()}</span>
		</div>
		)}
		<div className="flex items-center space-x-2">
		  <span className={
		    status === 'active' ? 'text-green-600 font-medium' :
		    status === 'locked' ? 'text-yellow-600 font-medium' :
			'text-red-600 font-medium'
	      }>
		    {status === 'active' && '🟢 Active'}
			{status === 'locked' && '🔒 Locked'}
			{status === 'ended' && '⏱️ Ended'}
	      </span>
	    </div>
	</div>
  )
}