function Option({id, label, selected = false, onSelect, disabled = false, votesCount, showVotes}) {

  console.log('showVote', showVotes);
  return (
    <button
      className={`
        flex justify-between w-full text-left px-4 py-2 rounded-md transition
        border font-medium
        ${selected ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-transparent"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      data-option-id={id}
      disabled={disabled}
      onClick={() => onSelect(id)}
    >
      { label }
      { showVotes && <span className="font-bold">{votesCount} votes</span> }
    </button>
  )
}

export default Option;