const QuizOption = ({ text, onSelect, selected = false, isBubble = false }) => {
  return (
    <button
      onClick={onSelect}
      className={`
        flex items-center justify-center px-4 py-3 transition duration-200 border font-medium
        ${isBubble ? "w-28 h-28 rounded-full text-center text-sm" : "w-full rounded-lg text-left"}
        ${selected ? "bg-accent border-accent" : "bg-option border-transparent hover:bg-accent"}
        text-white
        break-words text-sm
      `}
    >
      <span className={`${isBubble ? "text-sm font-lg" : "flex-1"}`}>
        {text}
      </span>

      {/* non-bubble-type */}
      {selected && !isBubble && (
        <span className="ml-auto text-green-300 font-bold">✓</span>
      )}
    </button>
  );
};

export default QuizOption;
