/* eslint-disable no-console */
// /* eslint-disable no-console */

// Задание № 5.16. Функции возвращаются
// Делу — время.
// // Напишите функцию, которая принимает время начала и конца рабочего дня,
// // а также время старта и продолжительность встречи в минутах и возвращает true,
// //  если встреча не выходит за рамки рабочего дня, и false, если выходит.

// // Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна.
// // Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

// // Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.

// // /*
// // '8:00' - начало рабочего дня
// // '17:30' - конец рабочего дня
// // '14:00' - начало встречи
// // 90 - продолжительность встречи в минутах
// // */
// // имяФункции('08:00', '17:30', '14:00', 90); // true
// // имяФункции('8:0', '10:0', '8:0', 120);     // true
// // имяФункции('08:00', '14:30', '14:00', 90); // false
// // имяФункции('14:00', '17:30', '08:0', 90);  // false
// // имяФункции('8:00', '17:30', '08:00', 900); // false

const setMeeting = (workingdayStartTime, workingdayEndTime, meetingStartTime, duration) => {

  const workingdayStartTimeArray = workingdayStartTime.split(':');
  const workingdayStartTimeHour = Number(workingdayStartTimeArray[0]);
  const workingdayStartTimeMinute = Number(workingdayStartTimeArray[1]);

  const workingdayEndTimeArray = workingdayEndTime.split(':');
  const workingdayEndTimeHour = Number(workingdayEndTimeArray[0]);
  const workingdayEndTimeMinute = Number(workingdayEndTimeArray[1]);

  const meetingStartTimeArray = meetingStartTime.split(':');
  const meetingStartTimeHour = Number(meetingStartTimeArray[0]);
  const meetingStartTimeMinute = Number(meetingStartTimeArray[1]);


  let durationHours = Number(0);
  let durationMinutes = Number(duration);
  if (Number(duration) > 60) {
    durationHours = Math.floor(Number(duration) / 60);
    durationMinutes = Number(duration) - (durationHours * 60);
  }
  let meetingEndTimeHour = Number(meetingStartTimeHour + durationHours);
  let meetingEndTimeMinute = Number(meetingStartTimeMinute + durationMinutes);
  if(meetingEndTimeMinute >= 60) {
    meetingEndTimeHour += 1;
    meetingEndTimeMinute -= 60;
  }

  if(
    workingdayStartTimeHour <= 23 && workingdayStartTimeMinute <= 59 &&
    workingdayEndTimeHour <= 23 && workingdayEndTimeMinute <= 59 &&
    meetingStartTimeHour <= 23 && meetingStartTimeMinute <= 59 &&
    meetingEndTimeHour <= 23 && meetingEndTimeMinute <= 59 &&
    workingdayEndTimeHour >= workingdayStartTimeHour &&
    meetingStartTimeHour >= workingdayStartTimeHour &&
    meetingStartTimeHour <= workingdayEndTimeHour) {

    // console.log('данныe ok');

    if (meetingEndTimeHour < workingdayEndTimeHour) {
      console.log(true);
      return true;
    }

    if ((meetingEndTimeHour === workingdayEndTimeHour) && (meetingEndTimeMinute <= workingdayEndTimeMinute)) {
      console.log(true);
      return true;
    }
  }

  {console.log(false);
    return false;}
};

setMeeting('08:00', '17:30', '14:00', 90); // true
setMeeting('8:0', '10:0', '8:0', 120); // true
setMeeting('08:00', '14:30', '14:00', 90); // false
setMeeting('14:00', '17:30', '08:0', 90); // false
setMeeting('8:00', '17:30', '08:00', 900); // false
