function Diff() {
  return (
    <>
      <figure className="diff w-full aspect-[16/4]" tabIndex={0}>
        <div className="diff-item-1" role="img" tabIndex={0}>
          <div
            className="grid place-content-center text-5xl font-black"
            style={{
              backgroundColor: "#a5b5b5",
              color: "white",
            }}
          >
            FurniITI
          </div>
        </div>
        <div className="diff-item-2" role="img">
          <div
            className="grid place-content-center text-5xl font-black"
            style={{
              backgroundColor: "#d7dbe0",
              color: "#000000",
            }}
          >
            FurniITI
          </div>
        </div>
        <div className="diff-resizer"></div>
      </figure>
    </>
  );
}

export default Diff;
