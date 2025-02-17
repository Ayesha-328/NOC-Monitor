import { useState, useEffect } from 'react';
import { getImageURLsForReport } from '../../api';

const ReportImages = ({ report, onImagesLoaded = () => {} }) => {
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (report.id) {
      setImages([]); // Clear existing images
      setLoadedCount(0); // Reset loaded count
      getImageURLsForReport(report.id).then((data) => {
        const proxiedImages = data.map(img => `http://localhost:3001/proxy?url=${encodeURIComponent(img)}`);
        setImages(proxiedImages);
      }).catch((error) => {
        console.log("Error in getImageURLsForReport:", error.message);
      });
    } else {
      setImages([]); // Clear images if report.id is not valid
    }
  }, [report]);

  useEffect(() => {
    if (images.length > 0 && loadedCount === images.length) {
      onImagesLoaded();
    }
  }, [loadedCount, images, onImagesLoaded]);

  const handleImageLoad = () => {
    setLoadedCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {images.map((img, idx) => (
        <div key={idx} className="w-[88px]">
          <img
            src={img}
            alt={`Screenshot ${idx}`}
            className="w-full max-h-[100px] border border-gray-300"
            onLoad={handleImageLoad}
          />
        </div>
      ))}
    </div>
  );
}

export default ReportImages;