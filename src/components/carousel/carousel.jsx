function Carousel({ slides, variant = "banner", idPrefix = "carousel" }) {
  return (
    <div className="carousel w-full">
      {slides.map((slide, index) => {
        const currentId = `${idPrefix}-slide${index + 1}`;
        const prevId = `${idPrefix}-slide${
          index === 0 ? slides.length : index
        }`;
        const nextId = `${idPrefix}-slide${
          index + 2 > slides.length ? 1 : index + 2
        }`;

        return (
          <div
            key={slide.id}
            id={currentId}
            className="carousel-item relative w-full"
          >
            {variant === "banner" && (
              <>
                <img
                  src={slide.image}
                  className="w-full h-[75vh] object-content"
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white text-center px-4">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">
                    {slide.title}
                  </h1>
                  <p className="mb-6 text-sm sm:text-base md:text-lg w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
                    {slide.description}
                  </p>
                  <button className="btn btn-outline btn-sm sm:btn-md md:btn-lg">
                    {slide.button} ❯
                  </button>
                </div>
              </>
            )}

            {variant === "quoutes" && (
              <div className="w-full h-[60vh] flex flex-col justify-center items-center text-center bg-gray-100 px-6">
                <div className="text-5xl text-gray-400 mb-4">“</div>
                <p className="text-gray-700 max-w-2xl text-base sm:text-lg mb-4 italic">
                  {slide.quote}
                </p>
                <p className="font-bold text-gray-800">{slide.author}</p>
                <p className="text-sm text-gray-500">{slide.role}</p>
              </div>
            )}

            <div className="absolute top-1/2 left-2 right-2 -translate-y-1/2 flex justify-between sm:left-5 sm:right-5 z-10">
              <a
                href={`#${prevId}`}
                className="btn btn-circle btn-sm sm:btn-md"
              >
                ❮
              </a>
              <a
                href={`#${nextId}`}
                className="btn btn-circle btn-sm sm:btn-md"
              >
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Carousel;
