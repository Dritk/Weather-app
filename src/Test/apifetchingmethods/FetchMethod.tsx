import { useEffect, useState } from "react";

interface Photo {
  id: string;
  author: string;
  download_url: string;
}

const FetchMethod: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => res.json())
      .then((data: Photo[]) => {
        console.log(data);
        setPhotos(data);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);

  return (
    <div>
      {photos.map((photo) => (
        <div key={photo.id} style={{ marginBottom: "20px" }}>
          <img
            src={photo.download_url}
            alt={`By ${photo.author}`}
            width={100}
            height={100}
          />
          <p>Author: {photo.author}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchMethod;
