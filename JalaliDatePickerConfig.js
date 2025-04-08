/*
JalaliDatePickerConfig.js
This file initializes the JalaliDatePicker component with default settings.
It is used to set the default date format, and other settings for the JalaliDatePicker component.
*/

const DATE_SELECTORS = [
  "input.calender",
  'input[id*="date"]',
  'input[id*="Date"]',
  'input[class*="date"]',
];

const JALALI_INITIALIZED_CLASS = "jalali-initilized";
const CALENDAR_CLASS = "calender";

export default JalaliDatePickerConfig = () => {
  /*
  selects all input elements with the class "calender" or id containing "date" or "Date"
  and initializes the JalaliDatePicker on them.
  */
  document
    .querySelectorAll(DATE_SELECTORS.join(", "))
    .forEach((inputElement) => {
      try {
        if (!inputElement.classList.contains(JALALI_INITIALIZED_CLASS)) {
          jalaliDatepicker.startWatch({ selector: `${inputElement.id}` });
          inputElement.classList.add(JALALI_INITIALIZED_CLASS, CALENDAR_CLASS);
        }
      } catch (error) {
          console.warn("Jalali init failed", e, el);
      }
    });
};
