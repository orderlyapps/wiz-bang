import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { supabase } from "@util/vendor/supabase/supabase-client";

interface SignedInStatusProps {
  on_sign_out: () => void;
}

export function SignedInStatus({ on_sign_out }: SignedInStatusProps) {
  const handleSignOut = () => {
    void supabase.auth.signOut().then(on_sign_out);
  };

  return (
    <>
      <TextButton fill="outline" on_click={handleSignOut} label="Sign Out" />
    </>
  );
}
