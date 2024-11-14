"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DROPDOWN_ACTION_MENU_OPTIONS } from "@/lib/constants";
import { constructFileUrl } from "@/lib/utils";
import { DropdownMenuActionInterface } from "@/types/core";
import { EllipsisVertical, Loader2 } from "lucide-react";
import Link from "next/link";
import { Models } from "node-appwrite";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  deleteFile,
  renameFile,
  updateFileUsers,
} from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "@/components/ActionModalContent";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionType, setActionType] =
    useState<DropdownMenuActionInterface | null>(null);
  const [fileName, setFileName] = useState<string>(file.name);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setActionType(null);
    setFileName(file.name);
    setEmails([]);
    setIsLoading(false);
  };

  const handleUserAction = async () => {
    if (!actionType) return;

    setIsLoading(true);

    let success = false;

    const actions = {
      rename: () =>
        renameFile({
          fileId: file.$id,
          name: fileName,
          extension: file.extension,
          path,
        }),
      share: () =>
        updateFileUsers({
          fileId: file.$id,
          emails: emails,
          path,
        }),
      delete: () =>
        deleteFile({
          fileId: file.$id,
          bucketFileId: file.bucketFileId,
          path,
        }),
    };

    success = await actions[actionType.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);

    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!actionType) return null;

    const { value, label } = actionType;

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={fileName}
              onChange={(event) => setFileName(event.target.value)}
            />
          )}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete
              <span> {file.name} </span> ?
            </p>
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} variant={"outline"}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleUserAction}>
              {isLoading ? (
                <Loader2 width={20} height={20} className="animate-spin" />
              ) : (
                <p className="capitalize">{value}</p>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <EllipsisVertical width={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{file.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {DROPDOWN_ACTION_MENU_OPTIONS.map((action) => (
            <DropdownMenuItem
              key={action.value}
              onClick={() => {
                setActionType(action);

                if (
                  ["rename", "share", "delete", "details"].includes(
                    action.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {action.value === "download" ? (
                <Link
                  href={constructFileUrl(file.bucketFileId)}
                  download={file.name}
                >
                  <div className="flex items-center gap-2">
                    <action.icon width={20} height={20} />
                    {action.label}
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <action.icon width={20} height={20} />
                  {action.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
