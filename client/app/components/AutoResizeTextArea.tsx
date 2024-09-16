import { useState, ChangeEvent } from 'react';

function AutoResizeTextArea(props:any) {
    const {minHeight, value, setValue} = props;
  const [height, setHeight] = useState(minHeight);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    
    // Reset height to auto to calculate the new height
    textarea.style.height = 'auto';
    
    // Calculate new height based on the content
    let newHeight = Math.min(textarea.scrollHeight, window.innerHeight * 0.7); // Max height 75vh
    newHeight = Math.max(newHeight, window.innerHeight * 0.3); // Min height 30vh

    // Update the height state
    setHeight(`${newHeight}px`);
  };

  return (
    <textarea
      placeholder="Compose email"
      className="w-full resize-none outline-none"
      style={{ height }}
      onInput={handleInput}
      value={value}
      onChange={(e)=>{setValue(e.target.value)}}
    />
  );
}

export default AutoResizeTextArea;