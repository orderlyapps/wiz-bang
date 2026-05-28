import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function TablesContent() {
  return (
    <>
      <NavItem label="Auth OTP Log" to="/tables/auth-otp-log" />
      <NavItem label="Auth User" to="/tables/auth-user" />
      <NavItem label="AV Assignment" to="/tables/av-assignment" />
      <NavItem label="AV Participation" to="/tables/av-participation" />
      <NavItem label="Clean Major" to="/tables/clean-major" />
      <NavItem label="Clean Minor" to="/tables/clean-minor" />
      <NavItem label="Clean Permission" to="/tables/clean-permission" />
      <NavItem label="Congregation" to="/tables/congregation" />
      <NavItem label="Congregation Admin" to="/tables/congregation-admin" />
      <NavItem label="Do Not Call" to="/tables/do-not-call" />
      <NavItem label="Event" to="/tables/event" />
      <NavItem label="Group" to="/tables/group" />
      <NavItem label="Map" to="/tables/map" />
      <NavItem label="Map Master" to="/tables/map-master" />
      <NavItem label="Midweek Assignment" to="/tables/midweek-assignment" />
      <NavItem label="Midweek Meeting Data" to="/tables/midweek-meeting-data" />
      <NavItem label="Midweek Participation" to="/tables/midweek-participation" />
      <NavItem label="Not At Home" to="/tables/not-at-home" />
      <NavItem label="Outline" to="/tables/outline" />
      <NavItem label="Publisher" to="/tables/publisher" />
      <NavItem label="Report" to="/tables/report" />
      <NavItem label="Report Permission" to="/tables/report-permission" />
      <NavItem label="Speaker Assignment" to="/tables/speaker-assignment" />
      <NavItem label="Speaker Availability" to="/tables/speaker-availability" />
      <NavItem label="Speaker Outline" to="/tables/speaker-outline" />
      <NavItem label="Street" to="/tables/street" />
      <NavItem label="Suburb" to="/tables/suburb" />
      <NavItem label="Weekend Assignment" to="/tables/weekend-assignment" />
      <NavItem label="Weekend Participation" to="/tables/weekend-participation" />
    </>
  );
}
