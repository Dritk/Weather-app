const Card = ({
  heading,
  number,
  text,
  imgSrc,
}: {
  heading: string;
  number: number;
  text: string;
  imgSrc?: string;
}) => {
  return (
    <div className="bg-[#2C2929] p-6 rounded-3xl shadow-lg  w-full relative">
      <h3 className="text-xl font-semibold text-white">{heading}</h3>

      <p className="text-4xl font-bold text-white mt-2">{number}</p>

      <p className="text-sm text-gray-400 mt-4">{text}</p>

      {imgSrc && (
        <div className="mt-4 flex justify-center">
          <img
            src={imgSrc}
            alt={heading}
            className="w-16 h-16 object-contain absolute bottom-4 right-4"
          />
        </div>
      )}
    </div>
  );
};

export default Card;
