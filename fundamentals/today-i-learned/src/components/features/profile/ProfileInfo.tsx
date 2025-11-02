import { useSuspendedUserProfile } from "@/api/hooks/useUser";
import { UserAvatar } from "@/components/shared/common/UserAvatar";
import { css, cx } from "@styled-system/css";

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface ProfileInfoProps extends BaseComponentProps {}

export function ProfileInfo({ className }: ProfileInfoProps) {
  const { data: userProfile } = useSuspendedUserProfile();

  return (
    <div
      className={cx(
        css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        }),
        className
      )}
    >
      <div className={css({ position: "relative" })}>
        {userProfile?.avatar_url ? (
          <img
            src={userProfile.avatar_url}
            alt={`${userProfile.login} avatar`}
            className={css({
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover"
            })}
          />
        ) : (
          <UserAvatar user={userProfile} />
        )}
      </div>

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px"
        })}
      >
        <h1
          className={css({
            fontWeight: "800",
            fontSize: "24px",
            lineHeight: "1.3",
            letterSpacing: "-0.4px",
            color: "#0F0F0F",
            textAlign: "center"
          })}
        >
          {userProfile?.name || userProfile?.login || "사용자"}
        </h1>
        <p
          className={css({
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "1.3",
            letterSpacing: "-0.4px",
            color: "rgba(0, 0, 0, 0.4)",
            textAlign: "center"
          })}
        >
          @{userProfile?.login || "user"}
        </p>
      </div>
    </div>
  );
}
