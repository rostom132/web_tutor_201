import { getData } from "./getData.js";

export const TimeSchedule = getData("./secret/constants/schedule.json");

export const LessonPerWeek = getData("./secret/constants/lesson_per_week.json");

export const HourPerLesson = getData("./secret/constants/hour_per_lesson.json");

export const GenderOfTutor = getData("./secret/constants/gender_of_tutor.json");

export const DateScheduleObj = getData("./secret/constants/date_obj.json");