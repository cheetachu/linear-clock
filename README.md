# linear-clock

A time-blindness accessible linear clock.

The clock is available at https://cheetahchu.github.io/linear-clock/

Several options are available by setting them in the URL.

START AND END HOURS

startHour: A number between 0 and 23. This defines the first hour to show in a day.
endHour: A number between 0 and 23. This defines the last hour to show in a day. If this is a smaller number than startHour, the clock will wrap across days, which may be helpful for people with night shifts.

Example: https://cheetahchu.github.io/linear-clock/?startHour=6&endHour=22

SEPARATORS

White lines separate chunks of the day. By default, they separate morning, afternoon, and evening. You can redefine them (and set however many you want) using this parameter. Each hour must be between 0 and 23, and must be between startHour and endHour.

Separators will appear following the hour you specify.

Example: https://cheetahchu.github.io/linear-clock/?separators[]=7&separators[]=10&separators[]=18

You can hide separators by using the hideSeparator parameter and setting it to true.

Example: https://cheetahchu.github.io/linear-clock/?hideSeparators=true

12/24 HOUR CLOCK

By default, a 24-hour clock is used. You can set it to the standard 12-hour AM/PM clock by setting hour12 to true.

Example: https://cheetahchu.github.io/linear-clock/?hour12=true
