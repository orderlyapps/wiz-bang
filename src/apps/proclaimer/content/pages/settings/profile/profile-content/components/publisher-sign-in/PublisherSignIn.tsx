import { OtpSignInModal } from "./otp-sign-in-modal/OtpSignInModal";
import { SignedInStatus } from "./signed-in-status/SignedInStatus";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import type { Publisher } from "@shared/database/schemas/publisher";

interface PublisherSignInProps {
  publisher: Publisher | null;
}

export function PublisherSignIn({ publisher }: PublisherSignInProps) {
  const session = useAuthSession();

  if (!publisher) return null;

  const is_signed_in = !!session;

  return (
    <>
      {is_signed_in ? (
        <>
          <SignedInStatus on_sign_out={() => {}} />
        </>
      ) : (
        <OtpSignInModal publisher_id={publisher.id ?? ""} onSignIn={() => {}} />
      )}
    </>
  );
}
