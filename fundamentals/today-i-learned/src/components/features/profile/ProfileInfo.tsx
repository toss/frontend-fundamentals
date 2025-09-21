import { useUserProfile } from "@/api/hooks/useUser";
import { UserAvatar } from "@/components/shared/common/UserAvatar";
import { css, cx } from "@styled-system/css";

interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

interface ProfileInfoProps extends BaseComponentProps {
  showLoadingSkeleton?: boolean;
}

export function ProfileInfo({
  className,
  showLoadingSkeleton = true
}: ProfileInfoProps) {
  const { data: userProfile, isLoading } = useUserProfile();

  if (isLoading && showLoadingSkeleton) {
    return (
      <div
        className={cx(
          css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            animation: "pulse 2s infinite"
          }),
          className
        )}
      >
        <div
          className={css({
            width: "100px",
            height: "100px",
            backgroundColor: "gray.200",
            borderRadius: "50%"
          })}
        />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px"
          })}
        >
          <div
            className={css({
              height: "32px",
              backgroundColor: "gray.200",
              borderRadius: "4px",
              width: "128px"
            })}
          />
          <div
            className={css({
              height: "20px",
              backgroundColor: "gray.200",
              borderRadius: "4px",
              width: "96px"
            })}
          />
        </div>
      </div>
    );
  }

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
          <UserAvatar user={userProfile} isLoading={isLoading} />
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
