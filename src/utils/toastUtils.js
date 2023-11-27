import { toast } from 'react-toastify';

// Function to show success toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    // Other options for the success toast
  });
};

// Function to show error toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    // Other options for the error toast
  });
};

// Function to show info toast
export const showInfoToast = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    // Other options for the info toast
  });
};

// Function to show warning toast
export const showWarningToast = (message) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT,
    // Other options for the warning toast
  });
};
