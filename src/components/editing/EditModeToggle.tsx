import { useEditing } from "@/contexts/EditingContext";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Settings } from "lucide-react";

export function EditModeToggle() {
  const { isEditMode, toggleEditMode, isAdmin } = useEditing();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {isEditMode && (
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
          Edit Mode Active
        </div>
      )}
      
      <Button
        onClick={toggleEditMode}
        className={`rounded-full h-14 w-14 shadow-lg ${
          isEditMode 
            ? "bg-blue-600 hover:bg-blue-700 text-white" 
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
        }`}
        title={isEditMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        data-testid={isEditMode ? "button-exit-edit-mode" : "button-enter-edit-mode"}
      >
        {isEditMode ? <Eye className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
      </Button>

      {isEditMode && (
        <div className="bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-3 py-2 rounded-lg text-xs max-w-48 text-center shadow-lg">
          Click on any text to edit. Press <kbd className="bg-gray-700 px-1 rounded">Esc</kbd> to exit.
        </div>
      )}
    </div>
  );
}