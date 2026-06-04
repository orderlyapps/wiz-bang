import { OtpSignInModal } from "./otp-sign-in-modal/OtpSignInModal";
import { SignedInStatus } from "./signed-in-status/SignedInStatus";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import type { Publisher } from "@shared/database/schemas/publisher";

interface PublisherSignInProps {
  publisher: Publisher;
}

export function PublisherSignIn({ publisher }: PublisherSignInProps) {
  const session = useAuthSession();

  if (!publisher.auth_id) return null;

  const is_signed_in = !!session && session.user.id === publisher.auth_id;

  return is_signed_in ? (
    <SignedInStatus on_sign_out={() => {}} />
  ) : (
    <OtpSignInModal publisher_id={publisher.id ?? ""} onSignIn={() => {}} />
  );
}
