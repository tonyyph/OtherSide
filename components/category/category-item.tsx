import type { FC } from "react";
import { MenuItem } from "../common/menu-item";

type CategoryItemProps = {
  category: CategoryS;
};

export const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  return (
    //   <Link
    //     asChild
    //     push
    //     href={{
    //       pathname: "/category/[categoryId]",
    //       params: { categoryId: category.id }
    //     }}
    //   >
    <MenuItem
      label={category?.name}
      // icon={() => (
      //   <GenericIcon
      //     // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      //     name={category.icon as any}
      //     className="size-6 text-foreground"
      //   />
      // )}
    />
    // </Link>
  );
};
