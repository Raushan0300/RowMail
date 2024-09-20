import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';

type FilePreviewerProps = {
  fileUrl: string; // URL or path of the file to preview
  mimeType: string; // MIME type of the file
  showDownloadButton?: boolean; // Show or hide download button
  showCloseButton?: boolean; // Show or hide close/cross button
  onClose?: () => void; // Close button click handler
  fileName?: string; // Name for download
};

const FilePreviewer: React.FC<FilePreviewerProps> = ({
  fileUrl,
  mimeType,
  showDownloadButton = true,
  showCloseButton = true,
  onClose,
  fileName = 'download',
}) => {
  const renderPreview = () => {
    if (mimeType.startsWith('image/')) {
      return (
        <div className="flex flex-col items-center">
          <img src={fileUrl} alt="Preview" className="w-32 h-32 object-cover" />
        </div>
      );
    } else if (mimeType.startsWith('video/')) {
      return (
        <div className="flex flex-col items-center">
          <video controls className="w-32 h-32 object-cover">
            <source src={fileUrl} type={mimeType} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (mimeType === 'application/pdf') {
      return (
        <div className="flex flex-col items-center">
          <embed
            src={fileUrl}
            type="application/pdf"
            className="w-32 h-32"
            aria-label="PDF Preview"
          />
        </div>
      );
    } else if (mimeType.startsWith('text/')) {
      return (
        <div className="flex flex-col items-center">
          <iframe
            src={fileUrl}
            title="File Preview"
            className="w-32 h-32"
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <p>Preview not available</p>
        </div>
      );
    }
  };

  return (
    <div className="bg-white px-2 rounded-lg shadow-md">
      <div className="mb-4">
        {renderPreview()}
      </div>
      <div className="flex items-center justify-between">
        <p className='truncate w-32'>{fileName}</p>
        {showDownloadButton && (
          <a
            href={fileUrl}
            download={fileName}
            className="p-2 rounded flex items-center"
          >
            <DownloadIcon className="text-blue-500" />
          </a>
        )}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="p-2 rounded flex items-center"
          >
            <CloseIcon className="text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FilePreviewer;