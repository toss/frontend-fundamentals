import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { css } from "@styled-system/css";
import { Button } from "@/components/shared/ui/Button";
import { AlertDialog } from "@/components/shared/ui/AlertDialog";

interface PostMoreMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  isLoading?: boolean;
  isDeleteError?: boolean;
}

export function PostMoreMenu({
  onEdit,
  onDelete,
  isLoading = false,
  isDeleteError = false
}: PostMoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    onEdit();
    setIsOpen(false);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsDeleteModalOpen(true);
    setIsOpen(false);
  };

  const handleConfirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={css({ position: "relative" })}>
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        className="shrink-0 p-2"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <MoreHorizontal className="h-5 w-5 text-gray-400" />
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className={css({
            position: "absolute",
            right: "0",
            top: "32px",
            zIndex: "50",
            width: "160px",
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "8px",
            gap: "8px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)"
          })}
        >
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className={css({
              width: "100%",
              height: "37px",
              paddingX: "16px",
              paddingY: "8px",
              textAlign: "left",
              fontWeight: "semibold",
              fontSize: "16px",
              lineHeight: "130%",
              letterSpacing: "-0.004em",
              color: "rgba(0, 0, 0, 0.8)",
              backgroundColor: "transparent",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              _hover: {
                backgroundColor: "rgba(0, 0, 0, 0.03)"
              },
              _disabled: {
                opacity: "0.5",
                cursor: "not-allowed"
              }
            })}
          >
            수정하기
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={isLoading}
            className={css({
              width: "100%",
              height: "37px",
              paddingX: "16px",
              paddingY: "8px",
              textAlign: "left",
              fontWeight: "semibold",
              fontSize: "16px",
              lineHeight: "130%",
              letterSpacing: "-0.004em",
              color: "rgba(0, 0, 0, 0.8)",
              backgroundColor: "transparent",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              _hover: {
                backgroundColor: "rgba(0, 0, 0, 0.03)"
              },
              _disabled: {
                opacity: "0.5",
                cursor: "not-allowed"
              }
            })}
          >
            삭제하기
          </button>
        </div>
      )}

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialog.Content
          showCloseButton
          className={css({
            // FIXME: AlertDialog 컴포넌트 내부도 pandacss로 마이그레이션 한후 important 제거 가능
            width: "343px !important",
            height: isDeleteError ? "270px" : "230px",
            backgroundColor: "#FCFCFC",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px",
            gap: "32px"
          })}
        >
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              textAlign: "center"
            })}
          >
            <h2
              className={css({
                fontWeight: "bold",
                fontSize: "22px",
                lineHeight: "130%",
                letterSpacing: "-0.4px",
                color: "#0F0F0F"
              })}
            >
              글을 삭제하시겠습니까?
            </h2>
            <p
              className={css({
                fontWeight: "medium",
                fontSize: "16px",
                lineHeight: "160%",
                letterSpacing: "-0.4px",
                color: "rgba(0, 0, 0, 0.8)",
                textAlign: "center"
              })}
            >
              댓글과 반응도 함께 삭제됩니다.
              <br />
              삭제 후에는 복구할 수 없습니다.
            </p>
          </div>

          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px"
            })}
          >
            <button
              onClick={handleConfirmDelete}
              disabled={isLoading}
              className={css({
                width: "96px",
                height: "46px",
                backgroundColor: "#0F0F0F",
                borderRadius: "200px",
                fontWeight: "bold",
                fontSize: "14px",
                lineHeight: "130%",
                letterSpacing: "-0.4px",
                color: "#FCFCFC",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                _hover: {
                  backgroundColor: "rgba(0, 0, 0, 0.9)"
                },
                _disabled: {
                  opacity: "0.5",
                  cursor: "not-allowed"
                }
              })}
            >
              {isLoading ? "삭제중..." : "삭제하기"}
            </button>

            {/* 에러 메시지 */}
            {isDeleteError && (
              <p
                className={css({
                  color: "red.500",
                  fontSize: "14px",
                  fontWeight: "medium"
                })}
              >
                삭제에 실패했습니다. 네트워크 상태를 확인해주세요.
              </p>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  );
}
