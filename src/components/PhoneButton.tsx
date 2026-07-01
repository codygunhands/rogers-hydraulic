import { business } from "@/config/business";
import { tracking } from "@/config/tracking";
import { CTAButton } from "./CTAButton";

/** Primary "Call for Service" button, wired to the config phone (or call-tracking override). */
export function PhoneButton({
  size = "md",
  label = "Call for Service",
  className,
}: {
  size?: "md" | "lg";
  label?: string;
  className?: string;
}) {
  const displayNumber = tracking.callTrackingNumber || business.phone;
  return (
    <CTAButton
      href={business.phoneHref}
      variant="primary"
      size={size}
      withPhoneIcon
      className={className}
      aria-label={`Call ${displayNumber} for service`}
    >
      {label}
    </CTAButton>
  );
}

export default PhoneButton;
