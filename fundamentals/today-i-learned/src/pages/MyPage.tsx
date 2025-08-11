import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ContributionGraph } from "../components/profile/ContributionGraph";
import { MyPostList } from "../components/profile/MyPostList";

export function MyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      {/* Profile Header Section */}
      <ProfileHeader />

      {/* Contribution Graph Section */}
      <ContributionGraph />

      {/* My Posts Section */}
      <MyPostList />
    </div>
  );
}
