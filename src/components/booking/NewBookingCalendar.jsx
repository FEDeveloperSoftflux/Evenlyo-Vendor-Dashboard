import React, { useReducer, useEffect, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import Badge from "../ui/Badge";
import EventPopover from "./EventPopover";
import BookingDetailDrawer from "./BookingDetailDrawer";
import AcceptedModal from "../modals/AcceptedModal";
import RejectModal from "../modals/RejectModal";
import { getBadgeStyle } from "../../assets/styleguide/badges";

/**
 * OPTIMIZED STATE MANAGEMENT APPROACH
 *
 * Instead of using multiple useState hooks which can cause:
 * - Multiple re-renders
 * - Complex state dependencies
 * - Performance issues
 *
 * We use useReducer for:
 * - Centralized state management
 * - Predictable state updates
 * - Better performance with fewer re-renders
 * - Easier debugging and testing
 */

// Initial state for the calendar component
const initialState = {
  currentDate: new Date(2025, 2), // March 2025
  selectedBooking: null,
  modals: {
    drawer: false,
    accept: false,
    reject: false,
  },
  popover: {
    event: null,
    position: { x: 0, y: 0 },
    isVisible: false,
  },
  viewport: {
    isMobile: false,
    isSmallMobile: false,
  },
};

// Reducer function to handle all state updates
const calendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, currentDate: action.payload };
    case "SET_SELECTED_BOOKING":
      return { ...state, selectedBooking: action.payload };
    case "TOGGLE_MODAL":
      return {
        ...state,
        modals: { ...state.modals, [action.modal]: action.isOpen },
      };
    case "SET_POPOVER":
      return {
        ...state,
        popover: { ...state.popover, ...action.payload },
      };
    case "HIDE_POPOVER":
      return {
        ...state,
        popover: { ...state.popover, event: null, isVisible: false },
      };
    case "SET_VIEWPORT":
      return {
        ...state,
        viewport: { ...state.viewport, ...action.payload },
      };
    default:
      return state;
  }
};

const BookingCalendar = ({ viewBy = "Week" }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  /**
   * RESPONSIVE BEHAVIOR WITH PERFORMANCE OPTIMIZATION
   *
   * Using useCallback to prevent unnecessary re-renders
   * and memoize the resize handler function
   */
  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth < 640;
    const isSmallMobile = window.innerWidth < 480;

    dispatch({
      type: "SET_VIEWPORT",
      payload: { isMobile, isSmallMobile },
    });
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  /**
   * NAVIGATION FUNCTIONS WITH USECALLBACK
   *
   * These functions are memoized to prevent unnecessary re-renders
   * when passed as props to child components
   */
  const navigateMonth = useCallback(
    (direction) => {
      dispatch({
        type: "SET_DATE",
        payload: new Date(
          state.currentDate.getFullYear(),
          state.currentDate.getMonth() + direction,
          state.currentDate.getDate()
        ),
      });
    },
    [state.currentDate]
  );

  const navigateDay = useCallback(
    (direction) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(state.currentDate.getDate() + direction);
      dispatch({ type: "SET_DATE", payload: newDate });
    },
    [state.currentDate]
  );

  /**
   * MEMOIZED CALCULATIONS FOR BETTER PERFORMANCE
   *
   * Calendar calculations that only update when currentDate changes
   */
  const { daysInMonth, firstDayOfWeek } = useMemo(() => {
    const daysInMonth = new Date(
      state.currentDate.getFullYear(),
      state.currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfWeek =
      (new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth(),
        1
      ).getDay() +
        6) %
      7;
    return { daysInMonth, firstDayOfWeek };
  }, [state.currentDate]);

  // Sample events data with more detailed information for popover
  const events = useMemo(
    () => [
      {
        id: 1,
        date: "2025-03-01",
        status: "rejected",
        title: "Reject",
        time: "9:00",
        customer: "Jane D.",
        description: "Customer declined booking",
        service: "Portrait Session",
      },
      {
        id: 2,
        date: "2025-03-04",
        status: "new",
        title: "New Order",
        time: "12:30",
        customer: "John S.",
        description: "Wedding photography session",
        service: "Wedding Photography",
      },
      {
        id: 3,
        date: "2025-03-05",
        status: "complete",
        title: "Complete",
        time: "11:30",
        customer: "Mike R.",
        description: "Portrait session completed",
        service: "Portrait Session",
      },
      {
        id: 4,
        date: "2025-03-09",
        status: "new",
        title: "New Order",
        time: "14:00",
        customer: "Sarah L.",
        description: "Corporate event photography",
        service: "Event Photography",
      },
      {
        id: 5,
        date: "2025-03-12",
        status: "complete",
        title: "Complete",
        time: "9:30",
        customer: "Alex T.",
        description: "Family photoshoot completed",
        service: "Family Photography",
      },
      {
        id: 6,
        date: "2025-03-16",
        status: "in-progress",
        title: "In Progress",
        time: "16:00",
        customer: "Emma W.",
        description: "Editing in progress",
        service: "Product Photography",
      },
      {
        id: 7,
        date: "2025-03-19",
        status: "in-progress",
        title: "In Progress",
        time: "13:00",
        customer: "David M.",
        description: "Shoot completed, editing pending",
        service: "Corporate Photography",
      },
      {
        id: 8,
        date: "2025-03-21",
        status: "rejected",
        title: "Reject",
        time: "9:30",
        customer: "Lisa K.",
        description: "Schedule conflict",
        service: "Wedding Photography",
      },
      {
        id: 9,
        date: "2025-03-25",
        status: "complete",
        title: "Complete",
        time: "11:00",
        customer: "Tom H.",
        description: "Event photography completed",
        service: "Event Photography",
      },
    ],
    []
  );

  /**
   * HOVER AND POPOVER LOGIC
   *
   * Desktop: Shows popover on hover with booking details
   * Mobile: Disabled for touch devices (better UX)
   */
  const handleEventHover = useCallback(
    (event, mouseEvent) => {
      // Only show popover on desktop (non-mobile devices)
      if (!state.viewport.isMobile && mouseEvent) {
        const rect = mouseEvent.currentTarget.getBoundingClientRect();
        dispatch({
          type: "SET_POPOVER",
          payload: {
            event,
            position: {
              x: rect.left + rect.width / 2,
              y: rect.top - 10,
            },
            isVisible: true,
          },
        });
      }
    },
    [state.viewport.isMobile]
  );

  const handleEventLeave = useCallback(() => {
    if (!state.viewport.isMobile) {
      dispatch({ type: "HIDE_POPOVER" });
    }
  }, [state.viewport.isMobile]);

  const handleEventClick = useCallback((event) => {
    dispatch({ type: "SET_SELECTED_BOOKING", payload: event });
    dispatch({ type: "TOGGLE_MODAL", modal: "drawer", isOpen: true });
    // Hide popover when clicking
    dispatch({ type: "HIDE_POPOVER" });
  }, []);

  const handleModalActions = useCallback((modalType, isOpen = false) => {
    dispatch({ type: "TOGGLE_MODAL", modal: modalType, isOpen });
    if (modalType === "accept" || modalType === "reject") {
      dispatch({ type: "TOGGLE_MODAL", modal: "drawer", isOpen: false });
    }
  }, []);

  /**
   * MEMOIZED CALENDAR DAYS CALCULATION
   *
   * Only recalculates when dependencies change
   */
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${state.currentDate.getFullYear()}-${String(
        state.currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = events.filter((event) => event.date === dateString);
      days.push({ day, dayEvents });
    }
    return days;
  }, [state.currentDate, firstDayOfWeek, daysInMonth, events]);

  /**
   * DAY VIEW COMPONENT
   *
   * Memoized for performance optimization
   */
  const DayView = useMemo(() => {
    const dayEvents = events.filter(
      (event) => event.date === state.currentDate.toISOString().split("T")[0]
    );

    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Day Navigation */}
        <div className="flex items-center justify-between p-3 xs:p-4 sm:p-6 border-b border-gray-200">
          <button
            onClick={() => navigateDay(-1)}
            className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
          </button>
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 text-center px-2">
            {state.viewport.isMobile
              ? state.currentDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              : state.currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
          </h2>
          <button
            onClick={() => navigateDay(1)}
            className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
          </button>
        </div>

        {/* Time Schedule */}
        <div className="p-2 xs:p-3 sm:p-4 md:p-6">
          <div className="space-y-1 xs:space-y-2">
            {Array.from({ length: 14 }, (_, i) => {
              const hour = i + 7; // Start from 7 AM
              const timeString = `${hour.toString().padStart(2, "0")}:00`;
              const hourEvents = dayEvents.filter((event) => {
                const eventHour = parseInt(event.time?.split(":")[0] || "0");
                return eventHour === hour;
              });

              return (
                <div
                  key={hour}
                  className="grid grid-cols-12 gap-1 xs:gap-2 sm:gap-4 min-h-[40px] xs:min-h-[50px] border-b border-gray-100 last:border-b-0"
                >
                  <div className="col-span-3 xs:col-span-2 sm:col-span-1 flex items-center">
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                      {timeString}
                    </span>
                  </div>
                  <div className="col-span-9 xs:col-span-10 sm:col-span-11 flex items-center">
                    {hourEvents.length > 0 ? (
                      <div className="w-full space-y-0.5 xs:space-y-1">
                        {hourEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`px-2 xs:px-3 py-1 xs:py-2 rounded-lg text-xs font-medium cursor-pointer transition-all hover:shadow-sm ${getBadgeStyle(
                              event.status
                            )}`}
                            onClick={() => handleEventClick(event)}
                            onMouseEnter={(e) => handleEventHover(event, e)}
                            onMouseLeave={handleEventLeave}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">{event.title}</span>
                              <span className="ml-1 xs:ml-2 text-xs opacity-75">
                                {event.time}
                              </span>
                            </div>
                            {event.customer &&
                              !state.viewport.isSmallMobile && (
                                <div className="text-xs opacity-80 mt-1">
                                  {event.customer}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center">
                        <div className="w-full h-6 xs:h-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer opacity-50"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {dayEvents.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm sm:text-base">
                No bookings scheduled for this day
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }, [
    state.currentDate,
    state.viewport,
    events,
    navigateDay,
    handleEventClick,
    handleEventHover,
    handleEventLeave,
  ]);

  /**
   * MONTH VIEW COMPONENT
   *
   * Memoized for performance optimization
   */
  const MonthView = useMemo(
    () => (
      <div className="border border-gray-200 rounded-2xl overflow-hidden">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-1 xs:p-2 sm:p-3 md:p-4 text-center border-r border-gray-200 last:border-r-0"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                {state.viewport.isSmallMobile
                  ? day.substring(0, 1)
                  : state.viewport.isMobile
                  ? day.substring(0, 3)
                  : day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((cell, index) => (
            <div
              key={index}
              className={`min-h-[60px] xs:min-h-[80px] sm:min-h-[100px] md:min-h-[120px] p-1 xs:p-2 border-r border-b border-gray-200 last:border-r-0 ${
                cell ? "bg-white hover:bg-gray-50" : "bg-gray-50"
              }`}
            >
              {cell && (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium text-gray-900">
                      {cell.day}
                    </span>
                    {cell.dayEvents.length > 0 && (
                      <span
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                          cell.dayEvents[0].status === "new"
                            ? "bg-pink-500"
                            : cell.dayEvents[0].status === "complete"
                            ? "bg-green-500"
                            : cell.dayEvents[0].status === "in-progress"
                            ? "bg-yellow-500"
                            : cell.dayEvents[0].status === "rejected"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      ></span>
                    )}
                  </div>
                  <div className="space-y-0.5 sm:space-y-1">
                    {cell.dayEvents
                      .slice(0, state.viewport.isMobile ? 1 : 3)
                      .map((event, i) => (
                        <div
                          key={i}
                          className={`px-1 xs:px-2 py-0.5 rounded text-xs font-medium cursor-pointer transition-all ${getBadgeStyle(
                            event.status
                          )}`}
                          onClick={() => handleEventClick(event)}
                          onMouseEnter={(e) => handleEventHover(event, e)}
                          onMouseLeave={handleEventLeave}
                        >
                          <div className="flex items-center justify-between">
                            <span className="truncate text-xs">
                              {event.title}
                            </span>
                            {event.time && (
                              <span className="ml-1 text-xs hidden sm:inline">
                                {event.time}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    {cell.dayEvents.length >
                      (state.viewport.isMobile ? 1 : 3) && (
                      <div className="text-xs text-gray-500 px-1 xs:px-2">
                        +
                        {cell.dayEvents.length -
                          (state.viewport.isMobile ? 1 : 3)}{" "}
                        more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [
      calendarDays,
      state.viewport,
      handleEventClick,
      handleEventHover,
      handleEventLeave,
    ]
  );

  return (
    <div className="w-full">
      {/* Navigation Header */}
      {viewBy !== "Day" && (
        <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
          </button>
          <h2 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-gray-900 text-center px-2">
            {state.viewport.isMobile
              ? `${monthNames[state.currentDate.getMonth()].substring(
                  0,
                  3
                )} ${state.currentDate.getFullYear()}`
              : `${
                  monthNames[state.currentDate.getMonth()]
                } ${state.currentDate.getFullYear()}`}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 text-gray-600" />
          </button>
        </div>
      )}

      {/* Render appropriate view */}
      {viewBy === "Day" ? DayView : MonthView}

      {/* Event Popover - Only shows on desktop */}
      {state.popover.isVisible &&
        state.popover.event &&
        !state.viewport.isMobile && (
          <EventPopover
            event={state.popover.event}
            position={state.popover.position}
            onClose={() => dispatch({ type: "HIDE_POPOVER" })}
          />
        )}

      {/* Booking Detail Drawer */}
      <BookingDetailDrawer
        isOpen={state.modals.drawer}
        booking={state.selectedBooking}
        onAccept={() => handleModalActions("accept", true)}
        onReject={() => handleModalActions("reject", true)}
        onClose={() => handleModalActions("drawer", false)}
      />

      {/* Modals */}
      <AcceptedModal
        isOpen={state.modals.accept}
        onClose={() => handleModalActions("accept", false)}
        booking={state.selectedBooking}
      />
      <RejectModal
        isOpen={state.modals.reject}
        onClose={() => handleModalActions("reject", false)}
        booking={state.selectedBooking}
      />
    </div>
  );
};

export default BookingCalendar;
