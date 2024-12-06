import { useGetMe } from "@/api-hooks/auth";
import Button from "@/components/button";
import Text from "@/components/text";
import useLogout from "@/hooks/use-logout";
import { $Enums, Prisma, TaskStatus } from "@prisma/client";
import { FaArrowUp, FaArrowDown, FaClock, FaCheckCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
interface TaskFilterProps {
  onSortChange: (value: Prisma.SortOrder) => void;
  onStatusChange: (value: TaskStatus | "all") => void;
  sortOrder: Prisma.SortOrder | undefined;
  statusFilter: TaskStatus | "all";
}

// Define sorting options as an array of objects
const sortOptions = [
  {
    label: "Ascending",
    value: Prisma.SortOrder.asc,
    icon: <FaArrowUp className="w-5 h-5" />,
    activeStyle: "text-blue-700", // Highlight style when selected
  },
  {
    label: "Descending",
    value: Prisma.SortOrder.desc,
    icon: <FaArrowDown className="w-5 h-5" />,
    activeStyle: "text-blue-700",
  },
] as const;

// Define status options as an array of objects
const statusOptions = [
  {
    label: "All",
    value: "all",
    icon: null,
  },
  {
    label: "Pending",
    value: $Enums.TaskStatus.pending,
    icon: <FaClock className="w-5 h-5" />,
  },
  {
    label: "Completed",
    value: $Enums.TaskStatus.completed,
    icon: <FaCheckCircle className="w-5 h-5" />,
  },
] as const;

export default function TaskFilter(props: TaskFilterProps) {
  const { onSortChange, onStatusChange, sortOrder, statusFilter } = props;
  const logout = useLogout();
  const { data } = useGetMe();
  const meData = data?.data;
  return (
    <div className="flex flex-col gap-2 sticky top-0 left-0 right-0 z-50 bg-white p-4">
      <Text variant="subheadingMedium" className="mb-4">
        Task List
      </Text>
      {!!meData && (
        <Button
          variant="error"
          className="fixed top-2 right-2"
          onClick={() => {
            logout.modalRef.current?.open();
          }}
        >
          <GoSignOut className="w-4 h-4" />
        </Button>
      )}
      {logout.dialog}
      {/* Sort and Status Filters in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sort by CreatedAt */}
        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-2">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort by Created
          </label>
          <div className="flex flex-1 gap-2 w-full">
            {sortOptions.map((option) => (
              <Button
                className="flex-1 px-2 py-1"
                variant={option.value === sortOrder ? "primary" : "secondary"}
                key={option.value}
                onClick={() => onSortChange(option.value)}
                leftSection={option.icon}
              >
                <span className="ml-1">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Filter by Status */}
        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-2">
          <label htmlFor="status" className="text-sm font-medium">
            Filter by Status
          </label>
          <div className="flex flex-1 gap-2 w-full">
            {statusOptions.map((option) => (
              <Button
                className="flex-1 px-2 py-1"
                key={option.value}
                variant={
                  statusFilter === option.value ? "primary" : "secondary"
                }
                onClick={() => onStatusChange(option.value)}
                leftSection={option.icon}
              >
                <span className="ml-1">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
