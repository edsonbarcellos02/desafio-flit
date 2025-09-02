import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat.js";
import utc from "dayjs/plugin/utc.js"; 
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export { dayjs };