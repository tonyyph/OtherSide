import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Text } from "../ui/text";

type UserAvatarProps = {
  user?: {
    id?: string | undefined;
    first_name?: string | undefined;
    imageUrl?: string | undefined;
    email?: string | undefined;
    last_name?: string | undefined;
    birthday?: string | undefined;
    gender?: string | undefined;
    language?: string | undefined;
    updatedAt?: string | undefined;
    createdAt?: string | undefined;
  };
  imageUrl?: string;
  className?: string;
  fallbackClassName?: string;
  fallbackLabelClassName?: string;
};

export function UserAvatar({
  user,
  imageUrl,
  className,
  fallbackClassName,
  fallbackLabelClassName
}: UserAvatarProps) {
  const shortName = user?.first_name?.split(" ")[0].slice(0, 2);
  return (
    <Avatar
      alt={`${123}'s avatar`}
      className={cn(
        "h-12 w-12 border border-blue-500 p-[1px] bg-muted",
        className
      )}
    >
      <AvatarImage source={{ uri: imageUrl }} />
      <AvatarFallback className={fallbackClassName}>
        <Text
          className={cn(
            "font-semiBold uppercase leading-tight",
            fallbackLabelClassName
          )}
        >
          {shortName}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
}
