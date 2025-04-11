import { Calendar } from "@workspace/ui/components/calendar/Calendar.js"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@workspace/ui/components/popover/Popover.js"
import { cn } from "@workspace/ui/lib/utils.js"
import { CalendarIcon } from "lucide-react"

/**
 * A date picker component with calendar integration.
 *
 * @component
 * @public
 *
 * @param {Object} props - Component props
 * @param {Date} [props.date] - Selected date
 * @param {(date?: Date) => void} props.setDate - Date selection handler
 * @param {string} [props.className] - Additional custom classes
 *
 * @example
 * <DatePicker date={date} setDate={setDate} />
 *
 * @see {@link https://ui.shadcn.com/docs/components/date-picker | Shadcn DatePicker Documentation}
 */
export function DatePicker({
    date,
    setDate,
    className
}: {
    date?: Date
    setDate: (date?: Date) => void
    className?: string
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type='button'
                    className={cn(
                        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    {date ? date.toLocaleDateString() : "Pick a date"}
                    <CalendarIcon className='ml-2 h-4 w-4 opacity-50' />
                </button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
                <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    )
}
