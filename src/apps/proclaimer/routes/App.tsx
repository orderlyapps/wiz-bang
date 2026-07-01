import { Redirect, Route } from "react-router-dom";
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet } from "@ionic/react";
import { CongregationGuard } from "@util/app/congregation/congregation-select/CongregationGuard";
import HomePage from "@proclaimer-routes/pages/home/Home";
import HomeEventsPage from "@proclaimer-routes/pages/home/events/Events";
import AssignmentsPage from "@proclaimer-routes/pages/home/assignments/Assignments";
import MinistryPage from "@proclaimer-routes/pages/ministry/Ministry";
import DoorToDoorPage from "@proclaimer-routes/pages/ministry/door-to-door/DoorToDoor";
import LetterWritingPage from "@proclaimer-routes/pages/ministry/letter-writing/LetterWriting";
import MapsPage from "@proclaimer-routes/pages/ministry/maps/Maps";
import MapDetailPage from "@proclaimer-routes/pages/ministry/maps/map-detail/MapDetail";
import SchedulePage from "@proclaimer-routes/pages/ministry/schedule/Schedule";
import SchedulesPage from "@proclaimer-routes/pages/schedules/Schedules";
import MidweekMeetingPage from "@proclaimer-routes/pages/schedules/midweek-meeting/MidweekMeeting";
import WeekendMeetingPage from "@proclaimer-routes/pages/schedules/weekend-meeting/WeekendMeeting";
import EventsPage from "@proclaimer-routes/pages/schedules/events/Events";
import CleaningPage from "@proclaimer-routes/pages/schedules/cleaning/Cleaning";
import PublishersPage from "@proclaimer-routes/pages/publishers/Publishers";
import LocationsPage from "@proclaimer-routes/pages/publishers/locations/Locations";
import SettingsPage from "@proclaimer-routes/pages/settings/Settings";
import AppearancePage from "@proclaimer-routes/pages/settings/appearance/Appearance";
import ProfilePage from "@proclaimer-routes/pages/settings/profile/Profile";
import HomeCleaningPage from "@proclaimer-routes/pages/home/cleaning/Cleaning";
import ReportsPage from "@proclaimer-routes/pages/home/reports/Reports";
import SecretaryPage from "@proclaimer-routes/pages/home/secretary/Secretary";
import SecretaryPublishersPage from "@proclaimer-routes/pages/home/secretary/publishers/Publishers";
import PublisherDetailsPage from "@proclaimer-routes/pages/home/secretary/publishers/publisher-details/PublisherDetails";
import GroupsPage from "@proclaimer-routes/pages/home/secretary/groups/Groups";
import GroupDetailsPage from "@proclaimer-routes/pages/home/secretary/groups/group-details/GroupDetails";
import CongregationAdminPage from "@proclaimer-routes/pages/home/congregation-admin/CongregationAdmin";
import AuthUsersPage from "@proclaimer-routes/pages/home/congregation-admin/auth-users/AuthUsers";
import SuperAdminPage from "@proclaimer-routes/pages/home/super-admin/SuperAdmin";
import PermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/Permissions";
import CleaningPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/cleaning/Cleaning";
import ReportsPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/reports/Reports";
import SecretaryPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/secretary/Secretary";
import ElderPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/elder/Elder";
import MinisterialServantPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/ministerial-servant/MinisterialServant";
import ClamOverseerPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/clam-overseer/ClamOverseer";
import ServiceOverseerPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/service-overseer/ServiceOverseer";
import CobePermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/cobe/Cobe";
import TerritoryServantPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/territory-servant/TerritoryServant";
import AvOverseerPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/av-overseer/AvOverseer";
import SpeakerPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/speaker/Speaker";
import WeekendPermissionsPage from "@proclaimer-routes/pages/home/congregation-admin/permissions/weekend/Weekend";
import ElderPage from "@proclaimer-routes/pages/home/elder/Elder";
import ContactsListPage from "@proclaimer-routes/pages/home/elder/contacts-list/ContactsList";
import ClamOverseerPage from "@proclaimer-routes/pages/home/clam-overseer/ClamOverseer";
import ServiceOverseerPage from "@proclaimer-routes/pages/home/service-overseer/ServiceOverseer";
import ServiceOverseerMapPage from "@proclaimer-routes/pages/home/service-overseer/map/Map";
import CobePage from "@proclaimer-routes/pages/home/cobe/Cobe";
import TerritoryServantPage from "@proclaimer-routes/pages/home/territory-servant/TerritoryServant";
import SpeakerPage from "@proclaimer-routes/pages/home/speaker/Speaker";
import WeekendPage from "@proclaimer-routes/pages/home/weekend/Weekend";
import WeekendSchedulePage from "@proclaimer-routes/pages/home/weekend/schedule/Schedule";
import WeekendAssignmentDetailPage from "@proclaimer-routes/pages/home/weekend/schedule/assignment-detail/WeekendAssignmentDetail";
import AvOverseerPage from "@proclaimer-routes/pages/home/av-overseer/AvOverseer";
import ClamDataPage from "@proclaimer-routes/pages/home/super-admin/clam-data/ClamData";
import ParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/Participation";
import ChairmanParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/chairman/Chairman";
import PrayerParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/prayer/Prayer";
import TreasuresParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/treasures/Treasures";
import GemsParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/gems/Gems";
import BibleReadingParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/bible-reading/BibleReading";
import ApplyParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/apply/Apply";
import TalkParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/talk/Talk";
import AssistantParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/assistant/Assistant";
import CounselorParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/counselor/Counselor";
import LivingParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/living/Living";
import CbsConductorParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/cbs-conductor/CbsConductor";
import CbsReaderParticipationPage from "@proclaimer-routes/pages/home/clam-overseer/participation/cbs-reader/CbsReader";
import ClamOverseerSchedulePage from "@proclaimer-routes/pages/home/clam-overseer/schedule/Schedule";
import AssignmentDetailPage from "@proclaimer-routes/pages/home/clam-overseer/schedule/assignment-detail/AssignmentDetail";
import AvSchedulePage from "@proclaimer-routes/pages/home/av-overseer/schedule/AvSchedule";
import AvAssignmentDetailPage from "@proclaimer-routes/pages/home/av-overseer/schedule/assignment-detail/AvAssignmentDetail";
import AvParticipationPage from "@proclaimer-routes/pages/home/av-overseer/participation/Participation";
import AvParticipationTypePage from "@proclaimer-routes/pages/home/av-overseer/participation/AvParticipationType";
import DataSharingPage from "@proclaimer-routes/pages/home/data-sharing/DataSharing";
import { Icon } from "@ui/components/icons/Icon";

function App() {
  return (
    <IonTabs>
      <CongregationGuard />
      <IonRouterOutlet>
        <Redirect exact path="/" to="/home" />
        <Route path="/home" component={HomePage} exact />
        <Route path="/home/events" component={HomeEventsPage} exact />
        <Route path="/home/assignments" component={AssignmentsPage} exact />
        <Route path="/home/cleaning" component={HomeCleaningPage} exact />
        <Route path="/home/reports" component={ReportsPage} exact />
        <Route path="/home/secretary" component={SecretaryPage} exact />
        <Route path="/home/secretary/publishers" component={SecretaryPublishersPage} exact />
        <Route
          path="/home/secretary/publishers/:publisher_id"
          component={PublisherDetailsPage}
          exact
        />
        <Route path="/home/secretary/groups" component={GroupsPage} exact />
        <Route path="/home/secretary/groups/:group_id" component={GroupDetailsPage} exact />
        <Route path="/home/congregation-admin" component={CongregationAdminPage} exact />
        <Route path="/home/congregation-admin/auth-users" component={AuthUsersPage} exact />
        <Route path="/home/congregation-admin/permissions" component={PermissionsPage} exact />
        <Route
          path="/home/congregation-admin/permissions/cleaning"
          component={CleaningPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/reports"
          component={ReportsPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/secretary"
          component={SecretaryPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/elder"
          component={ElderPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/ministerial-servant"
          component={MinisterialServantPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/clam-overseer"
          component={ClamOverseerPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/service-overseer"
          component={ServiceOverseerPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/cobe"
          component={CobePermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/territory-servant"
          component={TerritoryServantPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/av-overseer"
          component={AvOverseerPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/speaker"
          component={SpeakerPermissionsPage}
          exact
        />
        <Route
          path="/home/congregation-admin/permissions/weekend"
          component={WeekendPermissionsPage}
          exact
        />
        <Route path="/home/elder" component={ElderPage} exact />
        <Route path="/home/elder/contacts-list" component={ContactsListPage} exact />
        <Route path="/home/clam-overseer" component={ClamOverseerPage} exact />
        <Route path="/home/clam-overseer/participation" component={ParticipationPage} exact />
        <Route
          path="/home/clam-overseer/participation/chairman"
          component={ChairmanParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/prayer"
          component={PrayerParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/treasures"
          component={TreasuresParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/gems"
          component={GemsParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/bible-reading"
          component={BibleReadingParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/apply"
          component={ApplyParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/talk"
          component={TalkParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/assistant"
          component={AssistantParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/counselor"
          component={CounselorParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/living"
          component={LivingParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/cbs-conductor"
          component={CbsConductorParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/participation/cbs-reader"
          component={CbsReaderParticipationPage}
          exact
        />
        <Route
          path="/home/clam-overseer/schedule/:week_id/assignment/:assignment_id"
          component={AssignmentDetailPage}
          exact
        />
        <Route
          path="/home/clam-overseer/schedule/:week_id?"
          component={ClamOverseerSchedulePage}
          exact
        />
        <Route path="/home/service-overseer" component={ServiceOverseerPage} exact />
        <Route path="/home/service-overseer/map" component={ServiceOverseerMapPage} exact />
        <Route path="/home/cobe" component={CobePage} exact />
        <Route path="/home/territory-servant" component={TerritoryServantPage} exact />
        <Route path="/home/speaker" component={SpeakerPage} exact />
        <Route path="/home/weekend" component={WeekendPage} exact />
        <Route
          path="/home/weekend/schedule/:week_id/assignment/:assignment_id"
          component={WeekendAssignmentDetailPage}
          exact
        />
        <Route path="/home/weekend/schedule/:week_id?" component={WeekendSchedulePage} exact />
        <Route path="/home/av-overseer" component={AvOverseerPage} exact />
        <Route
          path="/home/av-overseer/schedule/:week_id/assignment/:assignment_id"
          component={AvAssignmentDetailPage}
          exact
        />
        <Route path="/home/av-overseer/schedule/:week_id?" component={AvSchedulePage} exact />
        <Route path="/home/av-overseer/participation" component={AvParticipationPage} exact />
        <Route
          path="/home/av-overseer/participation/:participation_id"
          component={AvParticipationTypePage}
          exact
        />
        <Route path="/home/super-admin" component={SuperAdminPage} exact />
        <Route path="/home/super-admin/clam-data" component={ClamDataPage} exact />
        <Route path="/home/data-sharing" component={DataSharingPage} exact />
        {/* MINISTRY */}
        <Route path="/ministry" component={MinistryPage} exact />
        <Route path="/ministry/door-to-door" component={DoorToDoorPage} exact />
        <Route path="/ministry/letter-writing" component={LetterWritingPage} exact />
        <Route path="/ministry/maps" component={MapsPage} exact />
        <Route path="/ministry/maps/detail/:map_id/:file_type" component={MapDetailPage} exact />
        <Route path="/ministry/schedule" component={SchedulePage} exact />
        {/* SCHEDULES */}
        <Route path="/schedules" component={SchedulesPage} exact />
        <Route path="/schedules/midweek-meeting/:week_id?" component={MidweekMeetingPage} exact />
        <Route
          path="/schedules/midweek-meeting/:week_id/assignment/:assignment_id?"
          component={AssignmentDetailPage}
          exact
        />
        <Route path="/schedules/weekend-meeting/:week_id?" component={WeekendMeetingPage} exact />
        <Route path="/schedules/events" component={EventsPage} exact />
        <Route path="/schedules/cleaning" component={CleaningPage} exact />
        {/* PUBLISHERS */}
        <Route path="/publishers" component={PublishersPage} exact />
        <Route path="/publishers/locations" component={LocationsPage} exact />
        {/* SETTINGS */}
        <Route path="/settings" component={SettingsPage} exact />
        <Route path="/settings/appearance" component={AppearancePage} exact />
        <Route path="/settings/profile" component={ProfilePage} exact />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <Icon name="home" />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="ministry" href="/ministry">
          <Icon name="ministry" />
          <IonLabel>Ministry</IonLabel>
        </IonTabButton>

        <IonTabButton tab="schedules" href="/schedules">
          <Icon name="schedules" />
          <IonLabel>Schedules</IonLabel>
        </IonTabButton>

        <IonTabButton tab="publishers" href="/publishers">
          <Icon name="publishers" />
          <IonLabel>Publishers</IonLabel>
        </IonTabButton>

        <IonTabButton tab="settings" href="/settings">
          <Icon name="settings" />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default App;
