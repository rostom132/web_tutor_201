import { getData } from "./getData.js";

export const TimeSchedule = getData("./static/constants/schedule.json");

export const LessonPerWeek = getData("./static/constants/lesson_per_week.json");

export const HourPerLesson = getData("./static/constants/hour_per_lesson.json");

export const GenderOfTutor = getData("./static/constants/gender_of_tutor.json");

export const DateScheduleObj = getData("./static/constants/date_obj.json");

export const currencyFormat = new Intl.NumberFormat('VND', {});