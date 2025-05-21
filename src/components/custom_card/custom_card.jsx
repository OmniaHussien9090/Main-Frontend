function CustomCard({ imageCard, titleCard, price }) {
  return (
    <>
      <div className="card bg-base-100 w-96">
        <figure className="px-10 pt-10">
          <img
            src={imageCard}
            alt="Card Image"
            className="w-full object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{titleCard}</h2>
          <p>{price}</p>
        </div>
      </div>
    </>
  );
}

export default CustomCard;
