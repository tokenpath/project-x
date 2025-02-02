export interface CustomAlertProps {
  title?: string;
  description: string | string[];
  className?: string;
  onDismiss?: () => void;
}
