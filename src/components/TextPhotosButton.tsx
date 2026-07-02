import { business } from "@/config/business";
import { CTAButton } from "./CTAButton";

/**
 * "Text Photos" CTA — opens the messaging app to the business number so a customer
 * can text a photo of the failed hose / machine. Field-service buyers often text
 * before they call.
 */
export function TextPhotosButton({
  size = "md",
  variant = "secondary",
  label = "Text Photos",
  className,
}: {
  size?: "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  label?: string;
  className?: string;
}) {
  return (
    <CTAButton
      href={business.smsHref}
      variant={variant}
      size={size}
      icon="message"
      className={className}
      aria-label="Text photos of your equipment to Rogers Hydraulic"
    >
      {label}
    </CTAButton>
  );
}

export default TextPhotosButton;
