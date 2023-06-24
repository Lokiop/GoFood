import React from "react";

export default function () {
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src="https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18807.jpg?size=626&ext=jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some text</p>
          <div className="container w-100">
            <select className="m-2 h-100 rounded" bg-success>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 rounded" bg-success>
              <option value={"half"}>Half</option>
              <option value={"full"}>Full</option>
            </select>
            <div className="d-inline fs-5">Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}
