import { format } from "date-fns";
import React from "react";
import Avatar from "../../assets/images/avatar.jpg";
import clsx from "clsx";

interface CardEventProps {
  title: string;
  type: "BOOKING_CLIENT" | "WEBINAR_EVENT";
  start_time: string;
  end_time: string;
  description: string;
  location?: string;
  recurring: boolean;
  recurring_pattern?: "DAYLY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  primary_color: string;
  background_color: string;
  meeting_url?: string;
  profile_client_url?: string;
  profile_client_image?: string;
}

const CardEvent: React.FC<CardEventProps> = ({
  title,
  type,
  start_time,
  end_time,
  description,
  location,
  recurring,
  recurring_pattern,
  primary_color,
  background_color,
  meeting_url,
  profile_client_url,
}) => {
  const dateFormatStart = format(new Date(start_time), "hh:mm a");
  const dateFormatEnd = format(new Date(end_time), "hh:mm a");
  const dateFormatGMT = format(new Date(start_time), "OOO");

  return (
    <div
      className={"p-2 border rounded-lg border-l-[7px] py-3 mt-4 shadow-md"}
      style={{
        borderLeftColor: primary_color,
      }}
    >
      <div className="flex flex-col ps-1">
        <div className="flex flex-row content-center justify-between">
          <div className="flex flex-col ">
            <div
              className="text-[14px] py-1 cursor-pointer underline"
              onClick={() => window.open(meeting_url, "_blank")}
            >
              {title}
            </div>
            <div className="text-[12px] text-gray-400">{description}</div>
            <div className="text-[12px] text-gray-400">{location}</div>
            <div className="text-[12px] text-gray-400">
              {dateFormatStart + " - " + dateFormatEnd + " " + dateFormatGMT}
            </div>
            {recurring && recurring_pattern === "DAYLY" && (
              <div className="self-start px-3 py-[6px] text-xs rounded-full bg-purple-200 my-2 text-center">
                Dayly
              </div>
            )}

            {recurring && recurring_pattern === "MONTHLY" && (
              <div className="self-start px-3 py-[6px] text-xs rounded-full bg-blue-200 my-2 text-center">
                Monthly
              </div>
            )}

            {recurring && recurring_pattern === "WEEKLY" && (
              <div className="self-start px-3 py-[6px] text-xs rounded-full bg-green-200 my-2 text-center">
                Weekly
              </div>
            )}

            {recurring && recurring_pattern === "YEARLY" && (
              <div className="self-start px-3 py-[6px] text-xs rounded-full bg-violet-200 my-2 text-center">
                Yearly
              </div>
            )}
          </div>
          {type === "BOOKING_CLIENT" && (
            <button
              onClick={() => window.open(meeting_url, "_blank")}
              className="flex content-center justify-center h-[40px] w-[40px] bg-blue-600 hover:bg-blue-700 rounded-full"
            >
              <span className="material-icons-outlined text-white mt-[7px]">
                videocam
              </span>
            </button>
          )}
        </div>
      </div>

      {type === "BOOKING_CLIENT" && (
        <div className="flex flex-row content-center mt-1">
          <img
            src={Avatar}
            alt=""
            className="h-7 w-7 object-center rounded-full"
          />
          <a
            target="_blank"
            href={profile_client_url}
            className="underline text-xs mt-2 ms-2 text-blue-400 cursor-pointer"
          >
            View Client Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default CardEvent;
