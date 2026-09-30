"use client";

import { useState } from "react";
import { z } from "zod";
import Image from "next/image";
import supportImg from "@/assets/images/employee/illustration.png";

const leaveSchema = z.object({
  leaveType: z.enum(["vacation", "sick"], {
    errorMap: () => ({ message: "Please select a valid leave type." }),
  }),
  leaveDate: z.string().min(1, "Leave date is required."),
  reason: z
    .string()
    .min(5, "Reason must be at least 5 characters long.")
    .max(500, "Reason must not exceed 500 characters."),
});

type LeaveApplicationDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    leaveType: "vacation" | "sick";
    leaveDate: string;
    reason: string;
  }) => void;
  submitting: boolean;
  leaveType: "vacation" | "sick";
  leaveDate: string;
  reason: string;
  minDate: string;
  maxDate: string;
  onChange: (
    field: "leaveType" | "leaveDate" | "reason",
    value: string,
  ) => void;
};

export default function LeaveApplicationDialog({
  open,
  onClose,
  onSubmit,
  submitting,
  leaveType,
  leaveDate,
  reason,
  minDate,
  maxDate,
  onChange,
}: LeaveApplicationDialogProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});

    const result = leaveSchema.safeParse({ leaveType, leaveDate, reason });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    onSubmit({ leaveType, leaveDate, reason });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 backdrop-blur-sm">
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={() => {
            setErrors({});
            onClose();
          }}
          className="absolute end-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-lg hover:bg-gray-200"
        >
          x
        </button>

        <h2 className="mb-4 text-center text-xl font-semibold text-[#073933]">
          Apply for Leave
        </h2>

        <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={supportImg}
            alt="leave support"
            className="h-full w-auto object-contain"
          />
        </div>

        <p className="mb-5 text-center text-sm text-gray-600">
          Pick your leave type, choose a day, and send your leave request.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="leave-type"
              className="mb-1 block text-sm text-gray-500"
            >
              Type of leave
            </label>
            <select
              id="leave-type"
              value={leaveType}
              onChange={(event) => {
                onChange("leaveType", event.target.value);
                setErrors((prev) => ({ ...prev, leaveType: "" }));
              }}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6c63ff]"
            >
              <option value="vacation">Vacation leave</option>
              <option value="sick">Sick leave</option>
            </select>
            {errors.leaveType && (
              <p className="mt-1 text-xs text-red-500">{errors.leaveType}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="leave-date"
              className="mb-1 block text-sm text-gray-500"
            >
              Leave date
            </label>
            <input
              id="leave-date"
              type="date"
              value={leaveDate}
              min={minDate}
              max={maxDate}
              onChange={(event) => {
                onChange("leaveDate", event.target.value);
                setErrors((prev) => ({ ...prev, leaveDate: "" }));
              }}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6c63ff] ${errors.leaveDate ? "border-red-500" : ""}`}
            />
            {errors.leaveDate && (
              <p className="mt-1 text-xs text-red-500">{errors.leaveDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="leave-reason"
              className="mb-1 block text-sm text-gray-500"
            >
              Reason
            </label>
            <textarea
              id="leave-reason"
              value={reason}
              onChange={(event) => {
                onChange("reason", event.target.value);
                setErrors((prev) => ({ ...prev, reason: "" }));
              }}
              placeholder="Add a short note for your leave request (min 5 chars)"
              className={`h-24 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#6c63ff] ${errors.reason ? "border-red-500" : ""}`}
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-red-500">{errors.reason}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#073933] py-3 font-medium text-white transition hover:bg-[#0a4a42] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Send Leave Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
