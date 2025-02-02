import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CustomAlertProps } from "@/types/alerts/alerts";

export const SuccessAlert = ({
  title = "Success",
  description,
  className,
  onDismiss,
}: CustomAlertProps) => (
  <Alert
    className={cn(
      "bg-green-50 dark:bg-green-900/20 border-green-600/50",
      className
    )}
  >
    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
    {onDismiss && (
      <Button
        variant="ghost"
        className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900"
        onClick={onDismiss}
      >
        <X className="h-4 w-4 text-green-600 dark:text-green-500" />
      </Button>
    )}
    <AlertTitle className="text-green-800 dark:text-green-400">
      {title}
    </AlertTitle>
    {Array.isArray(description) ? (
      <AlertDescription>
        <div className="text-green-700 dark:text-green-400">
          {description[0]}
        </div>
        {description.length > 1 && (
          <ul className="mt-2 list-disc pl-4">
            {description.slice(1).map((desc, index) => (
              <li key={index} className="text-green-700 dark:text-green-400">
                {desc}
              </li>
            ))}
          </ul>
        )}
      </AlertDescription>
    ) : (
      <AlertDescription className="text-green-700 dark:text-green-400">
        {description}
      </AlertDescription>
    )}
  </Alert>
);

export const ErrorAlert = ({
  title = "Error",
  description,
  className,
  onDismiss,
}: CustomAlertProps) => (
  <Alert
    className={cn("bg-red-50 dark:bg-red-900/20 border-red-600/50", className)}
  >
    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
    {onDismiss && (
      <Button
        variant="ghost"
        className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
        onClick={onDismiss}
      >
        <X className="h-4 w-4 text-red-600 dark:text-red-500" />
      </Button>
    )}
    <AlertTitle className="text-red-800 dark:text-red-400">{title}</AlertTitle>
    {Array.isArray(description) ? (
      <AlertDescription>
        <div className="text-red-700 dark:text-red-400">{description[0]}</div>
        {description.length > 1 && (
          <ul className="mt-2 list-disc pl-4">
            {description.slice(1).map((desc, index) => (
              <li key={index} className="text-red-700 dark:text-red-400">
                {desc}
              </li>
            ))}
          </ul>
        )}
      </AlertDescription>
    ) : (
      <AlertDescription className="text-red-700 dark:text-red-400">
        {description}
      </AlertDescription>
    )}
  </Alert>
);

export const InfoAlert = ({
  title = "Information",
  description,
  className,
  onDismiss,
}: CustomAlertProps) => (
  <Alert
    className={cn(
      "bg-blue-50 dark:bg-blue-900/20 border-blue-600/50",
      className
    )}
  >
    <Info className="h-5 w-5 text-blue-600 dark:text-blue-500" />
    {onDismiss && (
      <Button
        variant="ghost"
        className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900"
        onClick={onDismiss}
      >
        <X className="h-4 w-4 text-blue-600 dark:text-blue-500" />
      </Button>
    )}
    <AlertTitle className="text-blue-800 dark:text-blue-400">
      {title}
    </AlertTitle>
    {Array.isArray(description) ? (
      <AlertDescription>
        <div className="text-blue-700 dark:text-blue-400">{description[0]}</div>
        {description.length > 1 && (
          <ul className="mt-2 list-disc pl-4">
            {description.slice(1).map((desc, index) => (
              <li key={index} className="text-blue-700 dark:text-blue-400">
                {desc}
              </li>
            ))}
          </ul>
        )}
      </AlertDescription>
    ) : (
      <AlertDescription className="text-blue-700 dark:text-blue-400">
        {description}
      </AlertDescription>
    )}
  </Alert>
);

export const WarningAlert = ({
  title = "Warning",
  description,
  className,
  onDismiss,
}: CustomAlertProps) => (
  <Alert
    className={cn(
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-600/50",
      className
    )}
  >
    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
    {onDismiss && (
      <Button
        variant="ghost"
        className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-yellow-100 dark:hover:bg-yellow-900"
        onClick={onDismiss}
      >
        <X className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      </Button>
    )}
    <AlertTitle className="text-yellow-800 dark:text-yellow-400">
      {title}
    </AlertTitle>
    {Array.isArray(description) ? (
      <AlertDescription>
        <div className="text-yellow-700 dark:text-yellow-400">
          {description[0]}
        </div>
        {description.length > 1 && (
          <ul className="mt-2 list-disc pl-4">
            {description.slice(1).map((desc, index) => (
              <li key={index} className="text-yellow-700 dark:text-yellow-400">
                {desc}
              </li>
            ))}
          </ul>
        )}
      </AlertDescription>
    ) : (
      <AlertDescription className="text-yellow-700 dark:text-yellow-400">
        {description}
      </AlertDescription>
    )}
  </Alert>
);
