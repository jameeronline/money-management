import { toast } from "@/components/ui/toast"; // Adjust the import path

export function showToast(type, message, options = {}) {
  const toastTypes = {
    success: () =>
      toast({
        title: "Success",
        description: message,
        ...options,
      }),
    error: () =>
      toast({
        title: "Error",
        description: message,
        variant: "destructive", // Change style for error
        ...options,
      }),
    info: () =>
      toast({
        title: "Info",
        description: message,
        ...options,
      }),
  };

  if (toastTypes[type]) {
    toastTypes[type](); // Trigger the correct toast type
  } else {
    console.warn("Invalid toast type");
  }
}
