/**
 * This file provides the updated implementation for the Jalali datepicker
 * under the same name, "jquery.ui.datepicker".
 *
 * @file /D:/Source/date_picker_refactor/jquery.ui.datepicker-cc-fa.js
 * Note: The old functionality associated with this name is deprecated. This file
 *       carries the same name but introduces new functionalities.
 *
 * Warning: This file introduces different methods for jQuery that may cause
 *          compatibility issues with existing code relying on the old implementation.
 */
if (typeof $.fn.datepicker === "undefined") {
  $.fn.datepicker = function (options) {
    console.warn("Old datepicker called. Redirecting to jalaliDatepicker...");
    const { showOn, buttonImage, buttonImageOnly } = options;

    return this.each(function () {
      const $input = $(this);

      // Handle "button" option by inserting an image trigger
      if (showOn === "button") {
        const $nextElem = $input.next(".ui-datepicker-trigger");

        // Only add the image if it doesn't already exist
        if ($nextElem.length === 0) {
          const $img = $("<img>", {
            src: buttonImage,
            class: "ui-datepicker-trigger",
            css: { cursor: "pointer" },
            alt: "...",
            title: "...",
          });
          const autoComplete = buttonImageOnly ? "off" : "on";
          $img.attr("autocomplete", autoComplete);

          // Insert the image after the input field
          $input.after($img);

          let isShowing = false;

          $img.on("click", function () {
            if (isShowing) {
              jalaliDatepicker.hide();
            } else {
              jalaliDatepicker.show($input[0]);
            }
            isShowing = !isShowing;
          });
        }
        return;
      }

      // Initialize jalaliDatepicker if not already initialized
      if (!$input.hasClass("jalali-intitialized")) {
        jalaliDatepicker.startWatch({
          ...options,
          selector: `#${$input.attr("id")}`,
        });
        $input.addClass("jalali-intitialized calender");
      }
    });
  };
}

function displayDatePicker(dateElement) {
  console.warn(
    "Old displayDatePicker called. Redirecting to jalaliDatepicker..."
  );
}

function JalaliDate(p0, p1, p2) {
  var gregorianDate;
  var jalaliDate;

  if (!isNaN(parseInt(p0)) && !isNaN(parseInt(p1)) && !isNaN(parseInt(p2))) {
    var g = jalali_to_gregorian([
      parseInt(p0, 10),
      parseInt(p1, 10),
      parseInt(p2, 10),
    ]);
    setFullDate(new Date(g[0], g[1], g[2]));
  } else {
    setFullDate(p0);
  }

  function jalali_to_gregorian(d) {
    var adjustDay = 0;
    if (d[1] < 0) {
      adjustDay = leap_persian(d[0] - 1) ? 30 : 29;
      d[1]++;
    }
    var gregorian = jd_to_gregorian(
      persian_to_jd(d[0], d[1] + 1, d[2]) - adjustDay
    );
    gregorian[1]--;
    return gregorian;
  }

  function gregorian_to_jalali(d) {
    var jalali = jd_to_persian(gregorian_to_jd(d[0], d[1] + 1, d[2]));
    jalali[1]--;
    return jalali;
  }

  function setFullDate(date) {
    if (date && date.getGregorianDate) date = date.getGregorianDate();
    gregorianDate = new Date(date);
    gregorianDate.setHours(
      gregorianDate.getHours() > 12 ? gregorianDate.getHours() + 2 : 0
    );
    if (
      !gregorianDate ||
      gregorianDate == "Invalid Date" ||
      isNaN(gregorianDate || !gregorianDate.getDate())
    ) {
      gregorianDate = new Date();
    }
    jalaliDate = gregorian_to_jalali([
      gregorianDate.getFullYear(),
      gregorianDate.getMonth(),
      gregorianDate.getDate(),
    ]);
    return this;
  }

  this.getGregorianDate = function () {
    return gregorianDate;
  };

  this.setFullDate = setFullDate;

  this.setMonth = function (e) {
    jalaliDate[1] = e;
    var g = jalali_to_gregorian(jalaliDate);
    gregorianDate = new Date(g[0], g[1], g[2]);
    jalaliDate = gregorian_to_jalali([g[0], g[1], g[2]]);
  };

  this.setDate = function (e) {
    jalaliDate[2] = e;
    var g = jalali_to_gregorian(jalaliDate);
    gregorianDate = new Date(g[0], g[1], g[2]);
    jalaliDate = gregorian_to_jalali([g[0], g[1], g[2]]);
  };

  this.getFullYear = function () {
    return jalaliDate[0];
  };
  this.getMonth = function () {
    return jalaliDate[1];
  };
  this.getDate = function () {
    return jalaliDate[2];
  };
  this.toString = function () {
    return jalaliDate.join(",").toString();
  };
  this.getDay = function () {
    return gregorianDate.getDay();
  };
  this.getHours = function () {
    return gregorianDate.getHours();
  };
  this.getMinutes = function () {
    return gregorianDate.getMinutes();
  };
  this.getSeconds = function () {
    return gregorianDate.getSeconds();
  };
  this.getTime = function () {
    return gregorianDate.getTime();
  };
  this.getTimeZoneOffset = function () {
    return gregorianDate.getTimeZoneOffset();
  };
  this.getYear = function () {
    return jalaliDate[0] % 100;
  };

  this.setHours = function (e) {
    gregorianDate.setHours(e);
  };
  this.setMinutes = function (e) {
    gregorianDate.setMinutes(e);
  };
  this.setSeconds = function (e) {
    gregorianDate.setSeconds(e);
  };
  this.setMilliseconds = function (e) {
    gregorianDate.setMilliseconds(e);
  };
}
