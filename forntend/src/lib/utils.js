import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const readFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      resolve(reader.result); // File as Data URL
    };

    reader.onerror = (error) => {
      reject(error); // Error handling
    };

    reader.readAsDataURL(file); // File ko Data URL ke roop me padhta hai
  });
};
