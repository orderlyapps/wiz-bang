import { Heading } from "@ui/components/display/text/heading/Heading";

export function SuperAdminContent() {
  return (
    <div className="ion-padding">
      <Heading size="lg" bold>
        Super Admin Permissions
      </Heading>
      <p>Manage system-wide user access and roles.</p>
    </div>
  );
}
