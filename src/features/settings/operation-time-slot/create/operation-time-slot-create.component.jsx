import React from "react";

export const OperationTimeSlotCreate = () => {
  return (
    <div>
      <form className="mt-1">
        <div className="mb-3">
          <label className="label-form">Day</label>
          <select className="form-control">
            <option>Choose...</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="label-form">Operation Start Time</label>
          <input type="date" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="label-form">Operation End TIme</label>
          <input type="date" className="form-control" />
        </div>
      </form>
    </div>
  );
};

export default OperationTimeSlotCreate;
