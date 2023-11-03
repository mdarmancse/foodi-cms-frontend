import moment from "moment";

export const validateEndTimeGreaterThanStartTime = ({ StartTime, EndTime }) => {
  return StartTime < EndTime;
};

export const validateEndDateTimeGreaterThanStartDateTime = ({
  StartDateTime,
  EndDateTime,
}) => {
  return moment(StartDateTime).isBefore(EndDateTime);
};
